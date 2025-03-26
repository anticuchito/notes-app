from fastapi import APIRouter, Depends
from app.api.deps import get_current_user
from app.db.models.users import User
from app.schemas.note import NoteRequest
from app.services.note import (
    create_note,
    update_note,
    get_notes,
    delete_note,
    get_note_by_id,
)

## FIXME - Falta implementar la seguridad de las rutas lo otro es que probalbemente tendre que crear un servicio para User
# tambien probablemente tendre que crear un archivo en api que sea deps para obtener el current user para luego poder llamarlo en los endpoints(ve el ejmplo de fastapi)
router = APIRouter(
    prefix="/notes",
    tags=["notes"],
    dependencies=[Depends(get_current_user)],
)


@router.post("/")
def create_note_endpoint(
    data: NoteRequest, current_user: User = Depends(get_current_user)
):
    return create_note(data, current_user)


@router.put("/{note_id}")
def update_note_endpoint(note_id: int, data: NoteRequest):
    print("data", data)
    return update_note(note_id, data)


@router.get("/")
def get_notes_endpoint(current_user: User = Depends(get_current_user)):
    return get_notes(current_user)


@router.get("/{note_id}")
def get_note_endpoint(note_id: int):
    return get_note_by_id(note_id)


@router.delete("/{id}")
def delete_note_endpoint(id):
    return delete_note(id)
