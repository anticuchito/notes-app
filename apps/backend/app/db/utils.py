from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from app.core.errors import create_http_exception


def create_in_db(model, session: Session):
    try:
        session.add(model)
        session.commit()
        session.refresh(model)
        return model
    except IntegrityError as e:
        session.rollback()
        raise create_http_exception(400, "USER_ALREADY_EXISTS")
    finally:
        session.close()


def update_in_db(model, session: Session):
    try:
        response = session.add(model)
        session.commit()
        session.refresh(model)
        return response.to_dict()
    except IntegrityError as e:
        session.rollback()
        return {
            "message": "Error al actualizar el item",
            "error": str(e),
            "status": 400,
        }
    finally:
        session.close()


def get_by_value_in_db(model, session: Session, field, value):
    try:
        response = session.query(model).filter(getattr(model, field) == value).first()
        return response.__dict__
    except IntegrityError as e:
        raise create_http_exception(400, "USER_NOT_FOUND")
    finally:
        session.close()


def delete_in_db(model, session: Session):
    try:
        response = session.delete(model)
        session.commit()
        return response
    except IntegrityError as e:
        session.rollback()
        return {
            "message": "Error al eliminar el item",
            "error": str(e),
            "status": 400,
        }
    finally:
        session.close()
