from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room
from room import Room
from models import InvalidMoveError

app = Flask(__name__)

app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"

socketio = SocketIO(app, cors_allowed_origins="*")

ROOMS = {}


@app.route("/")
def sessions():
    return render_template("session.html")



@socketio.on("create")
def create_game():
    print("creating game")
    game = Room()
    room = game.id
    join_room(room)

    p_sign = game.add_player(request.sid)

    ROOMS[room] = game
    print(f'Room:{room}, SID: {request.sid}')

    emit("join", {"gameId": game.id, "pSign": p_sign}, room=request.sid)
    print(game.player_data())
    emit("game_data", game.to_json(), room=room)


@socketio.on("join")
def on_join(room):
    game = ROOMS[room]
    p_sign = game.add_player(request.sid)
    join_room(room)
    emit("join", {"gameId": game.id, "pSign": p_sign,}, room=request.sid)
    emit("game_data", game.to_json(), room=room)
    emit("player_data", game.player_data(), room=room)
    print("player 2 has joined ------------")

@socketio.on("register_player")
def register_player(data):
    game = ROOMS[data["room"]]
    player = game.slct_player_by_sid(request.sid)
    player.name = data["name"]
    print("player" + data["name"] + "registered ----")

@socketio.on("roll_dice")
def on_roll(data):
    room = data["room"]
    game = ROOMS[room]

    try:
        player_sign = data["player_sign"]
        game.roll_dice(player_sign)

        emit("game_data", game.to_json(), room=room)
        print(f"------- DICE ROLL: {game.dice}")
    except InvalidMoveError as e:
        print(e)


@socketio.on("move")
def on_move(data):
    room = data["room"]
    game = ROOMS[room]
    player_sign = data["player_sign"]

    try:
        move = (int(data["start"]), int(data["roll"]))
        game.execute_move(player_sign, move)
        emit("game_data", game.to_json(), room=room)

    except InvalidMoveError as e:
        print(e)


@socketio.on("game_data")
def on_game_data(room):
    game = ROOMS[room]
    print("sending game data")
    emit("game_data", game.to_json(), room=room)

@socketio.on("player_data")
def on_player_data(room):
    game = ROOMS[room]
    print("sending player data")
    emit("player_data", game.player_data(), room=room)
    print(game.player_data())


if __name__ == "__main__":
    socketio.run(app, debug=True)


