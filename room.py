import random
import string
from collections import namedtuple
from models import Board

class Room(Board):

    def __init__(self):
        super().__init__()
        self.players = {1:Player(1, "", ""), -1: Player(-1, "", "")}
        self.open_seats = {-1, 1}

    def add_player(self, sid, name=None):

        try:
            p_sign = self.open_seats.pop()
            
            if not name:
                p = "1" if p_sign == 1 else "2"
                name = "Player " + p
            
            player = Player(p_sign, sid, name)
            player.connected = True
            self.players[p_sign] = player
            return p_sign

        except KeyError as e:
            print("no seats left at table")

    def player_data(self):

        player_data = {player.sign : player.to_json() for player in self.players.values()}
        return player_data

    def slct_player_by_sid(self, sid):
        filtered = [player for player in self.players.values() if player.sid == sid]
        return filtered[0]


class Player:
    def __init__(self, sign, sid, name):

        self.id = self.generate_id()
        self.sid = sid
        self.name = name
        self.sign = sign
        self.connected = False

    def to_json(self):

        return {
            "userId": self.id,
            "name": self.name,
            "sign": self.sign,
            "connected": self.connected,
        }

    @classmethod
    def generate_id(cls):
        return "P" + "".join(
            [str(c) for c in random.choices(string.ascii_letters, k=5)]
        )


    




#   "players": {**self.players[1].to_json(), **self.players[-1].to_json()},