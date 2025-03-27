from fastapi import APIRouter, Depends
from app.schemas.auth import AuthRegister, AuthLogin
from app.services.auth import login, register, verify

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


# FIXME - falta implementar una orma decenta de respuetas de errores o success
# @router.post("/register/", response_model=AuthRegister)
@router.post("/register/")
def create_user_endpoint(data: AuthRegister):
    return register(data)


@router.post("/login/")
def login_user_endpoint(data: AuthLogin):
    return login(data)


@router.get("/verify/")
def verify_user_endpoint(token: str):
    return verify(token)
