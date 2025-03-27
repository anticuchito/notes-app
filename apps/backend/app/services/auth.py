from app.db.models.users import User
from app.utils import encrypt_password, check_password

from app.db import create_in_db, get_by_value_in_db
from app.db.session import SessionLocal
from app.core.errors import create_http_exception
from app.core.auth import generate_token, decode_token


def register(data):
    db_session = SessionLocal()
    if data.repeat_password != data.password:
        raise ValueError("Passwords do not match")

    hashed_password = encrypt_password(data.password)
    user = User(email=data.email, password_hash=hashed_password, name=data.name)
    response = create_in_db(user, db_session)
    print(response)

    token = generate_token({"email": user.email, "name": user.name})

    return {
        "email": user.email,
        "name": user.name,
        "token": token,
    }


def login(data):
    db_session = SessionLocal()
    user = get_by_value_in_db(
        User, db_session, field="email", value=data.email
    ).__dict__
    if not check_password(data.password, user["password_hash"]):
        raise create_http_exception(400, "INCORRECT_PASSWORD")

    token = generate_token({"email": user["email"], "name": user["name"]})

    return {
        "email": user["email"],
        "name": user["name"],
        "token": token,
    }


def verify(token):
    token_data = decode_token(token)

    if token_data is None:
        raise create_http_exception(400, "INVALID_TOKEN")

    return {
        "msg": "Token verificado correctamente",
        "email": token_data,
    }
