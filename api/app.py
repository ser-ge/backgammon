from flask import Flask, render_template, request, session 
from flask_session import Session
from flask_socketio import SocketIO, emit, join_room
from room import Room
from models import InvalidMoveError
from flask_cors import CORS
from decorators import handle_invalid_moves, error_response

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




@app.route("/api/new_game", methods=['GET'])
def new_game():
   
    game = Room()
    room = game.id
    p_sign = game.add_player()
    print("creating game: "+ room)

    session['gameId'] = room
    session['pSign'] = p_sign 
    ROOMS[room] = game
    print(session)
    return {"gameId": game.id, "pSign": p_sign, "session":session['gameId']}


@app.route("/api/join_game", methods=['GET'])
def join_game():
    room = request.args.get("game_id")
    print("joining game")

    game = ROOMS.get(room)

    if game:
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

    else:
        return error_response(room)





@socketio.on("join")
def on_join(data):
    print("JOIN: " + str(data))
    
    room = data.get("gameId")
    game = ROOMS.get(room)

    if game: 
        join_room(room)
        emit("game_data", game.to_json(), room=room)
        print(game.to_json())
        # emit("player_data", game.player_data(), room=room)
        print("----PLAYER HAS JOINED-----")
    else:
        emit("error",error_response(room) , room=request.sid)
 

# @socketio.on("register_player")
# def register_player(data):
#     game = ROOMS[data["room"]]
#     player = game.slct_player_by_sid(request.sid)
#     player.name = data["name"]
#     print("player" + data["name"] + "registered ----")

@socketio.on("roll_dice")
@handle_invalid_moves
def on_roll(data):
    room = data.get("room")
    game = ROOMS.get(room)

    if game:
        player_sign = data["player_sign"]
        game.roll_dice(player_sign)

        emit("game_data", game.to_json(), room=room)
        print(f"------- DICE ROLL: {game.dice}")
    else:
        emit("error", error_resposne(room), room=request.sid)


@socketio.on("move")
@handle_invalid_moves
def on_move(data):
    room = data.get("room")
    game = ROOMS.get(room)

    if game: 
        player_sign = data["player_sign"]

        move = (data.get("start"), data.get("roll"))
        game.execute_move(player_sign, move)
        emit("game_data", game.to_json(), room=room)
    else:
         emit("error", error_resposne(room), room=request.sid)



@socketio.on("resign")
@handle_invalid_moves
def on_resign(data):
    room = data.get("room")
    game = ROOMS.get(room)
    if game:
        player_sign = data["player_sign"]
        game.resign(player_sign)
        emit("game_data", game.to_json(), room=room)
        emit("resign",player_sign, room=room )
        print(f"------- PLAYER: {player_sign} HAS RESIGNED")
    else:
        emit("error", error_resposne(room), room=request.sid)

@socketio.on("restart_game")
def on_restart_game(data):
    room = data.get("room")
    game = ROOMS.get(room)
    if game:
        game.new_game()
        emit("game_data", game.to_json(), room=room)
    else:
        emit("error", error_resposne(room), room=request.sid)
   
@socketio.on("game_data")
def on_game_data(room):
    game = ROOMS[room]
    print("sending game data")
    emit("game_data", game.to_json(), room=room)

@socketio.on("message")
def on_message(data):
    print("Sending Message")

    if "gameId" in session: print(session["gameId"])

    emit("message", data, room=data["gameId"])

@socketio.on("double")
@handle_invalid_moves
def on_double(data):
    room = data.get("room")
    game = ROOMS.get(room)
    if game:
        player_sign = data["player_sign"]

        if data["proposal"]:
            game.propose_double(player_sign)
            print("-----DOUBLE PROPOSAL")
            print(data)
            emit("double", {"proposal": True, "pSign": player_sign} , room=room)
        elif data["accept"]:
            game.accept_double(player_sign)
            print("-----DOUBLE Acceptance")
            print(data)
            emit("double", {"proposal": False, "pSign": player_sign, "accept": True},room=room )
        else:
            print("double data is not a proposal or acceptance")
        emit("game_data", game.to_json(), room=room)

    else:
        emit("error", error_resposne(room), room=request.sid)




if __name__ == "__main__":
    socketio.run(app, debug=True)


