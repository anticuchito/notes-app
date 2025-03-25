from app.db.models.users import User
from app.db.session import SessionLocal
from app.db import get_by_value_in_db


def get_user_by_email(email: str):
    db_session = SessionLocal()
    user = get_by_value_in_db(User, db_session, field="email", value=email)
    return user
