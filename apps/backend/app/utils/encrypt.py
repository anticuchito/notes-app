import passlib.context import CryptContext



def encrypt_password(password):
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = context.hash(password)
    return hashed_password

def check_password(password, hashed_password):
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return context.verify(password, hashed_password)