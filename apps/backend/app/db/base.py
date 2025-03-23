from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

# Importa modelos aquí para evitar importación circular
def import_models():
    from app.db.models.users import User
    from app.db.models.notes import Note
    
    