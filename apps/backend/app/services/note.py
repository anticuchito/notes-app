from app.db.models.notes import Note
from app.db import create_in_db, get_by_value_in_db, update_in_db
from app.db.session import SessionLocal
from app.core.errors import create_http_exception
from app.schemas.note import NoteCreate, NoteUpdate, NoteDelete


def create_note(data: NoteCreate):
    db_session = SessionLocal()
    note = Note(
        title=data.title, description=data.description, owner_email=data.owner_email
    )
    response = create_in_db(note, db_session)
    return response


def update_note(data: NoteUpdate):
    db_session = SessionLocal()
    note = get_by_value_in_db(Note, db_session, field="id", value=data.id)
    note.title = data.title
    note.description = data.description
    response = update_in_db(note, db_session)
    return response


def get_notes():
    db_session = SessionLocal()
    notes = db_session.query(Note).all()
    return notes


def delete_note(id):
    db_session = SessionLocal()
    note = get_by_value_in_db(Note, db_session, field="id", value=id)
    response = db_session.delete(note)  # FIXME - falta implementar
    return response
