from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import StaleDataError
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


def update_in_db(model, schema, session: Session):
    try:
        session.commit()
        return {
            column.name: getattr(model, column.name)
            for column in model.__table__.columns
        }
    except (IntegrityError, StaleDataError) as e:
        session.rollback()
        raise create_http_exception(409, "CONFLICT_UPDATE_NOTE")


def get_by_value_in_db(model, session: Session, field, value, first: bool = True):
    print(session)
    try:
        if first:
            return session.query(model).filter(getattr(model, field) == value).first()

        else:
            return session.query(model).filter(getattr(model, field) == value).all()

    except IntegrityError as e:
        raise create_http_exception(400, "USER_NOT_FOUND")


def delete_in_db(model, session: Session):
    try:
        session.delete(model)
        session.commit()
        return {
            "success": True,
            "message": "Item deleted successfully",
            "deleted_id": getattr(model, "id", None),
        }
    except IntegrityError as e:
        raise create_http_exception(400, "ERROR_DELETE_NOTE")
