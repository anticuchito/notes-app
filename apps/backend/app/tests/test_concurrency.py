import pytest
import asyncio
from httpx import AsyncClient
from app.main import app
from app.db.session import SessionLocal
from app.db.models.notes import Note
from app.db.models.users import User
from app.utils import encrypt_password


@pytest.fixture(scope="function")
def db_session():
    """Create a fresh database session for each test."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture(scope="function")
def test_user(db_session):
    """Create a test user in the database."""
    hashed_password = encrypt_password("test_password")
    user = User(
        email="test@example.com",
        password_hash=hashed_password,
        name="Test User",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    yield user

    # Cleanup
    db_session.query(Note).filter(Note.owner_email == user.email).delete()
    db_session.query(User).filter(User.email == user.email).delete()
    db_session.commit()


@pytest.fixture(scope="function")
def test_note(db_session, test_user):
    """Create a test note in the database."""
    note = Note(
        title="Test Note", content="Initial Content", owner_email=test_user.email
    )
    db_session.add(note)
    db_session.commit()
    db_session.refresh(note)

    yield note


@pytest.mark.asyncio
async def test_concurrent_update(test_note):
    """Prueba de concurrencia: dos clientes actualizan la misma nota al mismo tiempo."""
    # test_client = TestClient(app)
    base_url = "http://127.0.0.1:8000"

    async with AsyncClient(base_url=base_url, follow_redirects=True) as client:
        # similacion de login de usuario
        login_data = {
            "email": "test@example.com",
            "password": "test_password",
        }

        response = await client.post("/api/auth/login", json=login_data)

        # Debug de la respuesta
        print("Status Code:", response.status_code)
        print("Response Content:", str(response.content, "utf-8"))

        if response.status_code != 200:
            pytest.fail(
                f"Login failed with status {response.status_code}: {response.content}"
            )

        # Obtener el token de la respuesta
        token_data = response.json()
        access_token = token_data.get("jwt")

        if not access_token:
            pytest.fail("No access token received")

        # set header
        headers = {"Authorization": f"Bearer {access_token}"}

        # Datos de actualización distintos para simular una condición de carrera
        data_1 = {"title": "Update 1", "content": "Content 1"}
        data_2 = {"title": "Update 2", "content": "Content 2"}

        response_1, response_2 = await asyncio.gather(
            client.put(
                f"/api/notes/{test_note.id}",
                json=data_1,
                headers=headers,
            ),
            client.put(
                f"/api/notes/{test_note.id}",
                json=data_2,
                headers=headers,
            ),
        )

        print("Respuesta 1:", response_1.status_code, response_1.json())
        print("Respuesta 2:", response_2.status_code, response_2.json())

        assert (response_1.status_code == 200 and response_2.status_code == 409) or (
            response_2.status_code == 200 and response_1.status_code == 409
        ), "Una de las dos actualizaciones debería haber fallado por conflicto."
