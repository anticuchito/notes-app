from app.db.models.notes import Note
from app.db import create_in_db, get_by_value_in_db, update_in_db, delete_in_db
from app.db.models.users import User
from app.db.session import SessionLocal
from app.core.errors import create_http_exception
from app.schemas.note import NoteRequest, NoteResponse


def create_note(data: NoteRequest, current_user: User):
    print("current_user", current_user)
    # pydantic validation de data falta implementar

    db_session = SessionLocal()
    note = Note(
        title=data.title,
        content=data.content,
        owner_email=current_user["email"],
    )
    response = create_in_db(note, db_session)
    db_session.close()
    return response


def update_note(note_id: int, data: NoteRequest):
    db_session = SessionLocal()
    note = get_by_value_in_db(Note, db_session, field="id", value=note_id)
    print("note", note)
    if note is None:
        raise create_http_exception(400, "NOTE_NOT_FOUND")

    note.title = data.title
    note.content = data.content
    response = update_in_db(note, NoteResponse, db_session)
    db_session.close()
    return response


def get_notes(current_user: User):
    db_session = SessionLocal()
    email = current_user["email"]
    output = get_by_value_in_db(
        Note, db_session, field="owner_email", value=email, first=False
    )
    db_session.close()
    return [item.__dict__ for item in output]


def get_note_by_id(id: int):
    try:
        db_session = SessionLocal()
        note = get_by_value_in_db(Note, db_session, field="id", value=id)
        db_session.close()
        return note.__dict__

    except:
        raise create_http_exception(400, "NOTE_NOT_FOUND")


def delete_note(id: int):
    db_session = SessionLocal()
    note = get_by_value_in_db(Note, db_session, field="id", value=id)
    response = delete_in_db(note, db_session)
    db_session.close()
    return response
