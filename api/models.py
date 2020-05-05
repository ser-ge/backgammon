import random
import string
from collections import namedtuple

ValidatedMove = namedtuple(
    "ValidatedMove", "player start_position roll end_position is_bearing_off"
)


class Board:
    def __init__(self):
        self.id = self.generate_id()
        self.score = {1: 0, -1: 0}
        self.new_game()

    def new_game(self):
        self.valid_moves = []
        self.dice_rolled = False
        self.dice_hist = []
        self.winner = None
        self.game_points = 1
        self.double_dice_owner = 0
        self.beared_off = {1: 0, -1: 0}
        self.turn = 1
        self.dice = []

        self.state = [
            0,
            2,
            0,
            0,
            0,
            0,
            -5,
            0,
            -3,
            0,
            0,
            0,
            5,
            -5,
            0,
            0,
            0,
            3,
            0,
            5,
            0,
            0,
            0,
            0,
            -2,
            0,
        ]
        # self.state = [
        #     0,
        #     0,
        #     0,
        #     -3,
        #     -2,
        #     -5,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     0,
        #     5,
        #     2,
        #     5,
        #     0,
        #     0,
        #     0,
        # ]




    def resign(self, active_player):
        op_player = -1 * active_player
        self.score[op_player] +=  self.game_points
        self.new_game()


    def roll_dice(self, player_sign, fix_dice=None):
        try:
            if player_sign != self.turn or self.dice_rolled != False:
                raise InvalidMoveError("Not your turn!")

            if fix_dice:
                roll = fix_dice
            else:
                roll = [random.choice(range(1, 7)) for _ in range(2)]

            if roll[0] == roll[1]:
                roll += roll

            self.dice = roll
            self.dice_rolled = True

        except InvalidMoveError as e:
            print(e)


    def get_bar_indices(self, active_player):
        """ returns the indecies in the points list representing the player's and opostion player's bar"""

        bar = 0 if active_player == 1 else 25
        op_bar = 0 if active_player == -1 else 25

        return (bar, op_bar)

    def get_player_home_indices(self, active_player):
        """ returns the indecies in the points list representing the player's home """

        home = range(19, 25) if active_player == 1 else range(1, 7)
        op_home = range(1, 7) if active_player == - 1 else range(19, 25)

        return (home, op_home)

    def get_player_points(self, active_player):

        """ returns list of points with opposition point values set to 0 and all point values postive"""

        return [max(0, active_player * i) for i in self.state]

    def player_is_home(self, active_player):

        player_points = self.get_player_points(active_player)
        bar, _ = self.get_bar_indices(active_player)
        home, _ = self.get_player_home_indices(active_player)

        outside_home = [
            pieces for index, pieces in enumerate(player_points) if index not in home
        ]


        # TODO check wether if condition required

        if self.state[bar] == 0 and sum(outside_home) == 0:
            return True

        else:
            return False

    def kill_piece(self, active_player, end_position):
        _, op_bar = self.get_bar_indices(active_player)
        self.state[end_position] += active_player
        self.state[op_bar] += active_player * -1

    def validate_move(self, player, move):

        # ''' input, int player : 1 ,-1
        #     tuple move (start_positon, dice_roll)

        #     player 1 home:  [19,24]
        #     player -1 home: [1,6]

        #     player 1 bar 0
        #     player -1 bar 25

        #     '''

        start_position = move[0]
        roll = move[1]
        is_bearing_off = False

        bar, op_bar = self.get_bar_indices(player)

        home, _ = self.get_player_home_indices(player)
        end_position = start_position + player * roll

        player_points = self.get_player_points(player)

        try:
            print(f"validating... {move}")
            assert player == self.turn, "Not your turn!"
            assert self.dice_rolled == True, "Roll the Dice!"
            assert (
                self.winner == None
            ), f"Game Over: {self.winner} has won the Game"

            assert roll in self.dice, f"You rolled {self.dice}, not {roll}"

            if self.state[bar] != 0:
                assert (
                    start_position == bar
                ), f"You have {self.state[bar]} pieces on the bar, move those first!"

    
            if self.player_is_home(player) and end_position not in range(1, 25):
                start_position = self.validate_bearing_off(player, start_position, end_position)
                end_position = None
                is_bearing_off = True

            else:
                assert (
                player * self.state[start_position] > 0
                ), f"You have no pieces to move from point {start_position}"

                assert end_position in range(
                    1, 25
                ), "Not all your pieces are home, can't bear off"
                assert (
                    player * self.state[end_position] >= -1
                ), "Point blocked by opponent"

            return ValidatedMove(
                player, start_position, roll, end_position, is_bearing_off
            )

        except AssertionError as e:
            raise InvalidMoveError(e.args[0])

    def validate_bearing_off(self, player, start_position, end_position):

        player_points = self.get_player_points(player)

        if end_position not in [0,25]:

            points = list(enumerate(player_points)) if player == 1 else reversed(list(enumerate(player_points)))
            max_point_with_pieces = next((point for point, pieces in points if pieces != 0 ), None)

            error_message = "You must bear off pieces from the higher points first"

            if player ==1:
                assert start_position <= max_point_with_pieces, error_message
            else:
                assert start_position >= max_point_with_pieces, error_message
        
            start_position = max_point_with_pieces
            return start_position

        else:
            return start_position


    def execute_move(self, player, move):

        try:
            move = self.validate_move(player, move)

            print(move)

            self.state[move.start_position] -= 1 * player

            if move.is_bearing_off:
                self.beared_off[move.player] += 1
            else:
                if self.state[move.end_position] == -player:
                    self.kill_piece(move.player, move.end_position)
                self.state[move.end_position] += 1 * move.player

            self.dice_hist.append(move.roll)
            self.dice.remove(move.roll)

            if self.beared_off[move.player] == 15:
                self.winner = player

            if len(self.dice) == 0:
                self.turn = self.turn * -1 if self.oppostion_can_enter(player) else self.turn
                self.dice_rolled = False

        except InvalidMoveError as e:
            print(e)

    def propose_double(self, active_player):
        if self.turn != active_player: raise InvalidMoveError("not your turn!")
        if self.dice_rolled: raise InvalidMoveError("You can only double before you move")
        if self.double_dice_owner == -active_player: raise InvalidMoveError("You dont have the dice")
        
        self.double_proposed = self.game_points * 2
        self.double_dice_owner = -1 * active_player

    def accept_double(self, active_player):

        if self.double_proposed < 2: raise InvalidMoveError("You can only double before you move")
        self.game_points = self.double_proposed
        self.double_proposed = 0



    def oppostion_can_enter(self, player):

        home, _ = self.get_player_home_indices(player)
        _, op_bar = self.get_bar_indices(player)
        player_points = self.get_player_points(player)

        home = [
            point for i, point in enumerate(player_points) if i in home
        ]

        home_is_blocked = all([abs(point) > 1 for point in home])

        if self.state[op_bar] != 0 and home_is_blocked:
            return False
        else:
            return True



    def find_all_valid_moves(self, player):

        valid_moves = []

        for i in range(25):
            for roll in self.dice:
                if self.validate_move(player, (i, roll), execute=False):
                    valid_moves.append((i, roll))

        self.valid_moves = valid_moves
        return valid_moves

    def print_board(self):
        print("Board ", self.state)
        print("beared_off", self.beared_off)

    def to_json(self):
        return {
            "game_id": self.id,
            "points": [{"value": value, "id": i} for i, value in enumerate(self.state)],
            "turn": self.turn,
          
            "bearedOff": {
                key: list(range(value)) for key, value in self.beared_off.items()
            },
            "dice": self.dice,
            "valid_moves": self.valid_moves,
            "diceHist": self.dice_hist,
             "gamePoints" : self.game_points,
            "doubleDiceOwner" : self.double_dice_owner,
            "winner" : self.winner,
            "score" : self.score
        }

    @classmethod
    def generate_id(cls):
        return "G" + "".join(
            [str(c) for c in random.choices(string.ascii_letters, k=5)]
        )




class InvalidMoveError(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return f"Invalid Move: {self.message}"


if __name__ == "__main__":

    board = Board(rules)

    print(board.validate_move(1, [1, 2]))
    print(board.validate_move(-1, [6, 10]))
