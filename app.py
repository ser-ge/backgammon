from flask import Flask, render_template, request, session 
from flask_session import Session
from flask_socketio import SocketIO, emit, join_room
from room import Room
from models import InvalidMoveError
from flask_cors import CORS

app = Flask(__name__)

app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
socketio = SocketIO(app, manage_session=False, cors_allowed_origins="*")
CORS(app, supports_credentials=True)
ROOMS = {}


@app.route("/")
def sessions():
    return render_template("session.html")




@app.route("/new_game", methods=['GET'])
def new_game():
   
    game = Room()
    room = game.id
    p_sign = game.add_player()
    print("creating game"+ room)

    session['gameId'] = room
    session['pSign'] = p_sign 
    ROOMS[room] = game
    print(session)
    return {"gameId": game.id, "pSign": p_sign, "session":session['gameId']}

@app.route("/join_game", methods=['GET'])
def join_game():
    room = request.args.get("game_id")
    print("joining game")

    try:
        game = ROOMS[room]
        print(game.id)
        print("sessions -----")
        print(session)
   
        

        if "gameId" in session and session["gameId"] == room:
            p_sign = session["pSign"]
            game.players[p_sign].connected = True

        else:
            p_sign = game.add_player()
            session['gameId'] = room
            session['pSign'] = p_sign
        
        json = game.to_json()
        json.update({"gameId": game.id, "pSign": p_sign})
        return json

    except KeyError as e:
        print(e)
        return "key error"




@socketio.on("join")
def on_join(data):
    print("JOIN: " + str(data))
    
    try:
        room = data["gameId"]
        game = ROOMS[room]
        join_room(room)
        emit("game_data", game.to_json(), room=room)
        print(game.to_json())
        # emit("player_data", game.player_data(), room=room)
        print("player 2 has joined ------------")
    except KeyError:
        print(f"Rooom  does not exists")

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

# @socketio.on("player_data")
# def on_player_data(room):
#     game = ROOMS[room]
#     print("sending player data")
#     emit("player_data", game.player_data(), room=room)
#     print(game.player_data())


if __name__ == "__main__":
    socketio.run(app, debug=True)


