from app.core.config import settings
from passlib.context import CryptContext
import jwt


def encode_jwt_token(data):
    return jwt.encode(data, settings.secret_key, algorithm="HS256")


def decode_jwt_token(token):
    return jwt.decode(token, settings.secret_key, algorithms=["HS256"])


def encrypt_password(password):
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = context.hash(password)
    return hashed_password


def check_password(password, hashed_password):
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return context.verify(password, hashed_password)
