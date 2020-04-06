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
    print('creating game')
    game = Board()
    room = game.id

    ROOMS[room] = game
    game.players[1].connected = True
    join_room(room)
    emit('join_room', game.to_json())

@socketio.on('join')
def on_join(room):
    game = ROOMS[room]
    game.players[-1].connected = True
    join_room(room)
    emit('join_room', game.to_json())

@socketio.on('getData')
def on_get_data(room):
    game = ROOMS[room]
    emit('getData', game.to_json())


@socketio.on('roll_dice')
def on_roll(data):
    room = data['room']
    game = ROOMS[room]
    player_sign = data['player_sign']

    game.roll_dice(player_sign)
    emit('roll_dice',game.to_json(), room=room)

@socketio.on('move')
def on_move(data):
    room = data['room']
    game = ROOMS[room]
    player_sign = data['player_sign']
    move = (int(data['start']), int(data['roll']))
    game.validate_move(player_sign,move)
    emit('move', game.to_json(), room=room)



if __name__ == '__main__':
    socketio.run(app, debug=True)


