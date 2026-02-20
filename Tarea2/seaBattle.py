import random

class SeaBattaleField:
    UNKNOWN = 0
    SHIP = 1
    HIT = 2
    MISS = 3
    KILL = 4

    def __init__(self):
        self.size = 8
        self.board = [[self.UNKNOWN for _ in range(self.size)]
                     for _ in range(self.size)]
        
    def print_field(self):
        for row in self.board:
            print(" ".join(str(cell) for cell in row))
    
    def shoot(self, x, y):
        if self.board[y][x] == self.SHIP:
            self.board[y][x] = self.HIT
            return 1
        else:
            self.board[y][x] = self.MISS
            return 0
    
    def get_random_field(self, seed):
        random.seed(seed)

        ship_sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

        for size in ship_sizes:
            placed = False

            while not placed:
                orientation = random.choice(["H", "V"])
                x = random.randint(0, self.size - 1)
                y = random.randint(0, self.size - 1)

                if self.can_place_ship(x, y, size, orientation):
                    self.place_ship(x, y, size, orientation)
                    placed = True

    def can_place_ship(self, x, y, size, orientation):
        for i in range(size):
            nx = 0
            ny = 0

            if orientation == "H":
                nx = x + i
                ny = y
            else:
                nx = x
                ny = y + i

            if self.size <= nx or self.size <= ny:
                return False
            
            for dx in [-1, 0, 1]:
                for dy in [-1, 0, 1]:
                    cx = nx + dx
                    cy = ny + dy

                    if 0 <= cx < self.size and 0 <= cy < self.size:
                        if self.board[cy][cx] == self.SHIP:
                            return False
        
        return True
    
    def place_ship(self, x, y, size, orientation):
        for i in range(size):
            nx = 0
            ny = 0

            if orientation == "H":
                nx = x + i
                ny = y
            else:
                nx = x
                ny = y + i

            self.board[ny][nx] = self.SHIP


field = SeaBattaleField()
field.get_random_field(123)
field.print_field()