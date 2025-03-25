from fastapi import HTTPException

error_messages = {
    "USER_ALREADY_EXISTS": {
        "msg": "usuario ya existe",
        "error_code": "USER_ALREADY_EXISTS",
    },
    "USER_NOT_FOUND": {
        "msg": "usuario no encontrado",
        "error_code": "USER_NOT_FOUND",
    },
    "INCORRECT_PASSWORD": {
        "msg": "contraseña incorrecta",
        "error_code": "INCORRECT_PASSWORD",
    },
}


def create_http_exception(status, error_msg):

    return HTTPException(status_code=status, detail=error_messages[error_msg])
