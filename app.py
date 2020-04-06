from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room 
from models import *

app = Flask(__name__)

app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'

socketio = SocketIO(app, cors_allowed_origins="*")

ROOMS = {}

@app.route('/')
def sessions():
    return render_template('session.html')


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('create')
def create_game():
    print('createing game')
    game = Board()
    room = game.id

    ROOMS[room] = game

    join_room(room)
    
    emit('join_room', game.to_json())

@socketio.on('join')
def on_join(data):
    room = data[room]
    game_data = ROOMS[room].to_json()
    join_room(room)
    send(game_data, room=room)

@socketio.on('roll_dice')
def on_roll(player_sign, room):
    game = ROOMS[room]
    game.roll_dice(player_sign)
    emit(game.to_json(), room=room)

@socketio.on('move')
def on_move(player_sign, move, room):
    game = ROOMS[room]
    move = (move['start'], move['roll'])
    game.validate_move(player_sign,move)
    emit(game.to_json(), room=room)



if __name__ == '__main__':
    socketio.run(app, debug=True)


