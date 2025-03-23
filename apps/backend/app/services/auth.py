from app.db.session import SessionLocal
from app.db.models.users import User
from app.utils.encrypt import encrypt_password


def register(data):
        db = SessionLocal()
        hashed_password = encrypt_password(data.password)
        user = User(email=data.email, password_hash=hashed_password, name=data.name)
        return user
    
def login(data):
        db = SessionLocal()
        user = db.query(User).filter(User.email == data.email).first()
        if user and user.check_password(data.password):
            return user
        else:
            return None
    
