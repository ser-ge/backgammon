import random
import string



class Board:

    def __init__(self):
        
        
        self.state = [0, 2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2, 0]
        self.beared_off= {1:1, -1:1}
        self.players = {1:Player('white',1), -1:Player('black',-1)}
        self.turn = 1
        self.dice = [0,0]
        self.id = self.generate_id()
        self.valid_moves = []
        self.dice_rolled = False
        self.dice_hist =[]


    def roll_dice(self, player_sign):

        if player_sign == self.turn and self.dice_rolled == False:
            roll = [random.choice(range(1,7)) for _ in range(2)]

            if roll[0] == roll[1]:
                roll += roll

            self.dice = roll
            self.dice_rolled = True

    def validate_move(self, player, move, execute=True):

        try:
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
            print("the start: " ,start_position)
            print("the roll: " ,roll)

            assert roll in self.dice, print(self.dice)


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
                self.dice_hist.append(roll)
                self.dice.remove(roll)

                if len(self.dice) == 0:
                    self.turn = self.turn * -1
                    self.dice_rolled = False

            self.print_board()

            return True

        except AssertionError:
            return False
    

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
        print("beared_off", self.beared_off)

    def to_json(self):
        return {'game_id':self.id,
                'points': [{'value':value, 'id': i} for i, value in enumerate(self.state)],
                'turn': self.turn,
                'players': {**self.players[1].to_json(), **self.players[-1].to_json() },
                'bearedOff': { key: list(range(value)) for key, value in self.beared_off.items()},
                'dice': self.dice,
                'valid_moves': self.valid_moves,
                'diceHist' : self.dice_hist
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
        self.connected = False

    
    def to_json(self):

        return {'user_id': self.id,
                        'color':self.color,
                        'sign':self.sign
        }

    @classmethod
    def generate_id(cls):
        return 'P'+ ''.join([str(c) for c in random.choices(string.ascii_letters, k=5)])

if __name__ == "__main__":

    board = Board(rules)

    print(board.validate_move(1,[1,2]))
    print(board.validate_move(-1,[6,10]))


    