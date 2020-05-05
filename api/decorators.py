from functools import wraps
from models import InvalidMoveError


def handle_invalid_moves(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
            
        except InvalidMoveError as e:
            print(e)

    return wrapper

            

def error_response(room):
    err_m = {"error": True, "message": f"Room {room} can't be found", "type": "NO_ROOM"}
    print(err_m)
    return err_m