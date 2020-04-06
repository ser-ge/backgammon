import random
import string



white = [0 for i in range(26)]

p = {1:0,6:5,8:3,13:5,24:2}

for key, value in p.items():
    white[key] = value

black = white[:]
black.reverse()

print(white)
board = [i - j for i, j in zip(black, white)]


rules = {"positions" : board}



class Board:

    def __init__(self, rules=rules):
        
        
        self.state = rules['positions']
        self.beared_off= {1:0, -1:0}
        self.players = {1:Player('white',1), -1:Player('black',-1)}
        self.turn = 1
        self.dice = []
        self.id = self.generate_id()
        self.valid_moves = []

    def roll_dice(self, player_sign):

        roll = [random.choice(range(1,7)) for _ in range(2)]

        if roll[0] == roll[1]:
            roll += roll

        self.dice = roll

    def validate_move(self, player, move, execute=True):


        assert player == self.turn, "Not your turns!"


        self.print_board()

    # ''' input, int player : 1 ,-1
    #     tuple move (start_positon, dice_roll)
        
    #     player 1 home:  [18,24]
    #     player -1 home: [1,6]

    #     player 1 board 0
    #     player -1 board 25
        
    #     '''
        start_position = move[0]
        roll = move[1]

        assert roll in self.dice, "You didn't roll that!"


        bar = 0 if player == 1 else 25
        op_bar = 0 if player == -1 else 25

        home = range(16,25) if player == 1 else range(1,7)

        players_pieces = [max(0, player*i) for i in self.state]

        outside_home = [pieces for position, pieces in enumerate(players_pieces) if position not in home]


        if self.state[bar] == 0 and sum(outside_home) == 0:
            all_home = True
            
        else:
            all_home = False


        if self.state[bar] != 0 and start_position != bar:
            return False

        if not player*self.state[start_position] > 0: return False

        end_positon = start_position + player*roll

        if all_home and end_positon not in range(1,25) and execute:
            self.state[start_position] -= 1 * player
            self.beared_off[player] += 1
            

        else:
            
            if not end_positon in range(1,25): return False
            
            if not player * self.state[end_positon] >= -1: return False

            print("moving")
            

            if execute:
                self.state[start_position] -= 1 * player


                
                if self.state[end_positon] == -player:
                    self.state[op_bar] +=1
                    self.state[end_positon] += player
            
                
                self.state[end_positon] += 1 * player

        if execute:
            self.dice.remove(roll)
            if len(self.dice) == 0:
                self.turn = self.turn * -1

        self.print_board()

        return True


    

    def find_all_valid_moves(self,player):

        valid_moves = []

        for i in range(25):
            for roll in self.dice:
                if self.validate_move(player, (i,roll), execute=False):
                    valid_moves.append((i,roll))

        self.valid_moves = valid_moves
        return valid_moves

    def print_board(self):
        print("Board ", self.state)
        print("beared_off", self.removed)

    def to_json(self):
        return {'game_id':self.id,
                'positions': self.state,
                'turn': self.turn,
                'players': {**self.players[1].to_json(), **self.players[-1].to_json() },
                'beared_off': self.beared_off,
                'dice': self.dice,
                'valid_moves': self.valid_moves
                }


    @classmethod
    def generate_id(cls):
        return 'G'+ ''.join([str(c) for c in random.choices(string.ascii_letters, k=5)])


class Player:

    def __init__(self, color, sign):
        
        self.id = self.generate_id()

        assert color == 'white' or color == 'black'
        self.color = color
        self.sign = sign

    
    def to_json(self):

        return {self.id : {
                        'color':self.color,
                        'sign':self.sign
        }}

    @classmethod
    def generate_id(cls):
        return 'P'+ ''.join([str(c) for c in random.choices(string.ascii_letters, k=5)])

if __name__ == "__main__":

    board = Board(rules)

    print(board.validate_move(1,[1,2]))
    print(board.validate_move(-1,[6,10]))


    