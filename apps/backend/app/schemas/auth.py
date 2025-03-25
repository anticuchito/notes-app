from pydantic import BaseModel, EmailStr
from typing import Optional


class AuthLogin(BaseModel):
    email: EmailStr
    password: str


class AuthRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    repeat_password: str
    
class AuthRegisterResponse(BaseModel):
     email: str
     name: str
     password: str
     created_at: str
