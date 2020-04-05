

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

    def __init__(self,rules):
        
        
        self.state = rules['positions']
        self.removed= {1:0, -1:0}

    

    def validate_move(self, player, move, execute=False):

        self.print_board()

    # ''' input, int player : 1 ,2
    #     tuple move (start_positon, dice_roll)
        
    #     player 1 home:  [18,24]
    #     player -1 home: [1,6]

    #     player 1 board 0
    #     player -1 board 25
        
    #     '''
        start_position = move[0]
        roll = move[1]


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
            self.removed[player] += 1

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


        self.print_board()

        return True

    def find_all_valid_moves(self,player, dice):

        # players_pieces = [max(0, player*i) for i in self.state]

        # valid_starts = [position for position, pieces in enumerate(players_pieces) if pieces >0]

        valid_moves = []

        for i in range(25):
            for roll in dice:
                print(roll)
                print(dice)
                if self.validate_move(player, (i,roll), execute=False):
                    valid_moves.append((i,roll))

        return valid_moves

    def print_board(self):
        print("Board ", self.state)
        print("Removed", self.removed)



if __name__ == "__main__":

    board = Board(rules)

    print(board.validate_move(1,[1,2]))
    print(board.validate_move(-1,[6,10]))


    