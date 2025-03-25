from app.core.config import settings
from passlib.context import CryptContext
import jwt


def generate_jwt_token(data):
    return jwt.encode(data, settings.secret_key, algorithm="HS256")


from passlib.context import CryptContext


def encrypt_password(password):
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = context.hash(password)
    return hashed_password


def check_password(password, hashed_password):
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return context.verify(password, hashed_password)
