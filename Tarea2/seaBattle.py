import random

class SeaBattleField:
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
        if not (0 <= x < self.size and 0 <= y < self.size):
            return 0

        if self.board[y][x] in (self.HIT, self.MISS, self.KILL):
            return 0
        
        if self.board[y][x] == self.SHIP:
            self.mark_hit(x, y)
            
            if self.is_ship_destroyed(x, y):
                self.mark_entire_ship_as_killed(x, y)
                return 2

            return 1
        
        else:
            self.mark_miss(x, y)
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

    def is_loser(self):
        for row in self.board:
            if self.SHIP in row:
                return False
        
        return True

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

    def is_ship_destroyed(self, x, y):
        visited = set()
        stack = [(x, y)]

        while stack:
            (cx, cy) = stack.pop()

            if (cx, cy) in visited:
                continue
            visited.add((cx, cy))

            if self.board[cy][cx] == self.SHIP:
                return False
            
            for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                (nx, ny) = cx + dx, cy + dy

                if 0 <= nx < self.size and 0 <= ny < self.size:
                    if self.board[ny][nx] in (self.SHIP, self.HIT):
                        stack.append((nx, ny))

        return True
    
    def mark_entire_ship_as_kill(self, x, y):
        visited = set()
        stack = [(x, y)]
        
        while stack:
            (cx, cy) = stack.pop()

            if (cx, cy) in visited:
                continue
            visited.add((cx, cy))

            if self.board[cy][cx] == self.HIT:
                self.board[cy][cx] = self.KILL

            for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                (nx, ny) = cx + dx, cy + dy

                if 0 <= nx < self.size and 0 <= ny < self.size:
                    if self.board[ny][nx] == self.HIT:
                        stack.append((nx, ny))

    def mark_miss(self, x, y):
        self.board[y][x] = self.MISS

    def mark_hit(self, x, y):
        self.board[y][x] = self.HIT
    
    def mark_kill(self, x, y):
        self.board[y][x] = self.KILL

field = SeaBattaleField()
field.get_random_field(123)
field.print_field()