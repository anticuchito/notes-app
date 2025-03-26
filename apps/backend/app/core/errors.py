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
    "INVALID_CREDENTIALS": {
        "msg": "credenciales incorrectas",
        "error_code": "INVALID_CREDENTIALS",
    },
    "INVALID_TOKEN": {
        "msg": "token invalido",
        "error_code": "INVALID_TOKEN",
    },
    "CONFLICT_UPDATE_NOTE": {
        "msg": "error al actualizar el item",
        "error_code": "CONFLICT_UPDATE_NOTE",
    },
    "NOTE_NOT_FOUND": {
        "msg": "nota no encontrada",
        "error_code": "NOTE_NOT_FOUND",
    },
    "NOTE_ALREADY_EXISTS": {
        "msg": "la nota ya existe",
        "error_code": "NOTE_ALREADY_EXISTS",
    },
}


def create_http_exception(status, error_msg, headers=None):

    if headers:
        return HTTPException(
            status_code=status, detail=error_messages[error_msg], headers=headers
        )
    else:
        return HTTPException(status_code=status, detail=error_messages[error_msg])
