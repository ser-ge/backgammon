from models import *


game = Board()

try:

    game.state = [
            0,
            0,
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
            0,
            -5,
            0,
            0,
            0,
            0,
            0,
            5,
            0,
            0,
            0,
            0,
            -2,
            0,
        ]
    game.print_board()

    game.roll_dice(1, fix_dice=[1,4])

    # game.execute_move(-1, (1,1))

    # game.roll_dice(1, fix_dice=[1,5])
    game.execute_move(1,(1,4))
    game.print_board()

except InvalidMoveError as e:
    print(e)