# Notes App

## Iniciar el proyecto

```bash
git clone https://github.com/mayra-r/notes-app.git
cd notes-app
```

## instalar dependencias

**instalar dependencias del backend:**

```bash
cd apps/backend
python -m venv .venv
source .venv/bin/activate #en windows: .venv\Scripts\activate
pip install -r requirements.txt
```

**instalar dependencias del frontend:**

```bash
cd apps/frontend
npm install
```

## iniciar el backend y el frontend

**iniciar el backend:**

```bash
cd apps/backend
uvicorn app.main:app --reload
```

**iniciar el frontend:**

```bash
cd apps/frontend
npm run dev
```

## crear una nueva base de datos

**crear un usuario en postgres:**

```bash
sudo -u postgres psql # en windows: psql -U postgres
CREATE USER mayra WITH PASSWORD '123456';
```

**crear una base de datos:**

primeramente hay que cambiar el nombre de la base datos en el archivo 'alembic.ini':

```bash
  [alembic]
    sqlalchemy.url = postgresql://notes-user:S3cr3t$P4SWRD@localhost:5432/notes-db
  ```

y luego ejecutar el comando:

```bash
alembic upgrade head
```

esto es para recrear las tablas de la base de datos.

---

## Tecnologías usadas

 las tecnologías usadas en este proyecto son:

- FastAPI: la utilice por requerimeintos del challenge tecnico.
- SQLAlchemy: la utilice para la base de datos.
- Alembic: la utilice para migraciones.
- PostGreSQL: la utilice por requerimeintos del challenge tecnico.
- Tailwind CSS: la utilice por su facilidad de uso y aparte shadcn UI lo utiliza para el tema.
- TypeScript y React: la utilice por su facilidad de uso y requerimientos del challenge tecnico.
- shadcn UI: la utilice por su tema de color y su utilidad en el frontend.
- Vite: lo utilice por que encuentro que es la mejor opcion para crear un nuevo proyecto en react
- pytest: lo utilice para probar la concurrecia de la base de datos y por requerimientos del challenge tecnico.
- lucide-react y tw-animate-css: lo utilice para crear iconos y animaciones. son dependencias de shadcn UI.

---

## Estrategia de bloqueo

la estrategia de bloque elegida para este proyecto es el bloqueo optimista. en la cual junto a sqlalchemy que puede manejar
el versionado de  la tabla notes. por lo cual no tuve que implementar el bloqueo optimista a mano, entonces cuando se intenta
hacer una actulizacion a la nota esta como tiene el campo version vigilado por sqlalchemy este bloquea la transaccion y da un error
de que la actualizacion no se puede realizar
la implementacion del bloqueo se puede ver en el archivo 'app/db/models.py' en la clase 'Note'

```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from app.db.base import Base


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    content = Column(String)
    version = Column(Integer, nullable=False, default=1)
    owner_email = Column(String, ForeignKey("users.email"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    __mapper_args__ = {"version_id_col": version}  # bloqueo optimista con version_id_col

```

luego solo queda implementar el bloqueo optimista en la funcion 'update_note' en el archivo 'app/services/notes.py'

```python
def update_note(note_id: int, data: NoteRequest):
    db_session = SessionLocal()
    note = get_by_value_in_db(Note, db_session, field="id", value=note_id)
    print("note", note)
    if note is None:
        raise create_http_exception(400, "NOTE_NOT_FOUND")

    note.title = data.title
    note.content = data.content
    response = update_in_db(note, NoteResponse, db_session)
    db_session.close()
    return response
```

y en la funcion update_in_db en el archivo 'app/db/__init__.py' se encuentra la excepcion que se lanza cuando se intenta hacer una
actualizacion a una nota que ya ha sido actualizada

```python
def update_in_db(model, model_response, db_session):
    try:
        db_session.add(model)
        db_session.commit()
        return model_response.from_orm(model)
    except sqlalchemy.exc.IntegrityError:
        db_session.rollback()
        raise create_http_exception(400, "NOTE_ALREADY_UPDATED")
```

---

## desafios enfrentados

creo yo que algunos de los desafios que enfrente en este proyecto son los siguientes:

  **crear una apis rest con fastapi:** nunca habia hecho una api con este framework antes. pero leyendo la docuementacion y ejemplos de internet puede lograr sortearlo aunque fue lo que mas me demoro.

  **el bloqueo en python y el test de este mismo:** el bloqueo en python es un poco complicado . pero gracias a un ejemplo que encontre por [Internet](https://dev.to/ivankwongtszfung/safe-update-operation-in-postgresql-using-sqlalchemy-3ela) pude implementarlo como lo que esta desvrito arriba.
