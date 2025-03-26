from pydantic import BaseModel


class NoteRequest(BaseModel):
    title: str
    content: str


class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    version: int
