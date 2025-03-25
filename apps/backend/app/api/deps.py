from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from app.core.errors import create_http_exception
from app.core.auth import decode_token
from app.services.user import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_except2ion = create_http_exception(
        401, "INVALID_CREDENTIALS", headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        email = decode_token(token)
        if email is None:
            raise credentials_except2ion
        user = get_user_by_email(email)

        return user

    except PyJWTError:
        raise credentials_except2ion
