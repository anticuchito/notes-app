from app.core.config import settings
from datetime import datetime, timedelta, timezone
from app.utils import decode_jwt_token, encode_jwt_token
from app.core.errors import create_http_exception


def decode_token(token: str):
    try:
        payload = decode_jwt_token(token)
        email: str | None = payload["email"]

        if email is None:
            raise create_http_exception(400, "INVALID_TOKEN")
        return email
    except Exception as e:
        raise create_http_exception(400, "INVALID_TOKEN")


def generate_token(data: dict):
    payload = data.copy()
    payload.update(
        {
            "iat": datetime.now(),
            "exp": datetime.now(timezone.utc) + timedelta(hours=2),
        }
    )
    return encode_jwt_token(payload)
