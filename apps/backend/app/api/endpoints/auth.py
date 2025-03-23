from fastapi import APIRouter, Depends
from app.schemas.auth import AuthRegister, AuthLogin
from app.services.auth import login, register

router = APIRouter()


@router.post("/register/", response_model=AuthRegister)
def create_user_endpoint(data: AuthRegister):
    return register(data)


@router.post("/login/", response_model=AuthLogin)
def login_user_endpoint(data: AuthLogin):
    return login(data)
