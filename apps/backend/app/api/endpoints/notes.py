from fastapi import APIRouter, Depends
from app.api.deps import get_current_user
from app.schemas.note import NoteUpdate, NoteCreate
from app.services.note import create_note, update_note, get_notes, delete_note

## FIXME - Falta implementar la seguridad de las rutas lo otro es que probalbemente tendre que crear un servicio para User
# tambien probablemente tendre que crear un archivo en api que sea deps para obtener el current user para luego poder llamarlo en los endpoints(ve el ejmplo de fastapi)
router = APIRouter(
    prefix="/notes",
    tags=["notes"],
    dependencies=[Depends(get_current_user)],
)


@router.post("/")
def create_note_endpoint(data: NoteCreate):
    return create_note(data)


@router.put("/{id}")
def update_note_endpoint(data: NoteUpdate, id):
    return update_note(data)


@router.get("/")
def get_notes_endpoint():
    return "acces to notes"
    # return get_notes()


@router.delete("/{id}")
def delete_note_endpoint(id):
    return delete_note(id)
