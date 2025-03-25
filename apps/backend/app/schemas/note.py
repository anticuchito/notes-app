from pydantic import BaseModel, EmailStr
from typing import Optional


class Note(BaseModel):
    id: int
    title: str
    description: str
    owner_email: str


class NoteCreate(BaseModel):
    title: str
    description: str


class NoteUpdate(BaseModel):
    title: str
    description: str


class NoteDelete(BaseModel):
    id: int
