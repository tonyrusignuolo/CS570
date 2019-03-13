'''
Created on Nov 30, 2017

@author: arusignu

I pledge my honor that I have abided by the Stevens Honor System.
'''

class Board(object):
    def __init__(self, width, height):
        """this is a docstring"""
        self.width = width
        self.height = height
        board = []
        for i in range(height):
            row = []
            for j in range(width):
                row.append(' ')
            board.append(row)
        self.board = board
        
    def allowsMove(self,col):
        """this is a docstring"""
        if not isinstance(col, int):
            return False
        elif col in range(self.width):
            for i in range(self.height):
                if self.board[i][col] == ' ':
                    return True
        else:
            return False
       
        
    def addMove(self, col, ox):
        """this is a docstring"""
        if self.allowsMove(col) == True:
            for i in range(self.height-1,-1,-1):
                er = i
                if self.board[i][col] == ' ':
                    break
            self.board[er][col] = ox
        else:
            raise ValueError   
    
    def setBoard(self,move_string):
        """
        takes in a string of columns and places 
        alternating checkers in those columns, 
        starting with 'X' 
         
        For example, call b.setBoard('012345') 
        to see 'X's and 'O's alternate on the 
        bottom row, or b.setBoard('000000') to 
        see them alternate in the left column. 
 
        moveString must be a string of integers
        """
         
        nextCh = 'X'   # start by playing 'X' 
        for colString in move_string: 
            col = int(colString) 
            if 0 <= col <= self.width: 
                self.addMove(col, nextCh) 
            if nextCh == 'X': nextCh = 'O' 
            else: nextCh = 'X' 
    
    
    def delMove(self, col):
        """this is a docstring"""
        if self.board[self.height-1][col] == ' ':
            raise Error
        else:
            for i in range(self.height-1,-1,-1):
                if self.board[i][col] == ' ':
                    break
                er = i
            self.board[er][col] = ' '
    
    
    def winsFor(self, ox):
        """this is a docstring"""
        for i in range(self.height):
            for j in range(self.width):
                if self.board[i][j] == ox:
                    #horizontal
                    if j + 3 <= self.width - 1 and \
                    self.board[i][j + 1] == ox and \
                    self.board[i][j + 2] == ox and \
                    self.board[i][j + 3] == ox:
                        return True
                    #vertical
                    elif i + 3 <= self.height - 1 and \
                    self.board[i + 1][j] == ox and \
                    self.board[i + 2][j] == ox and \
                    self.board[i + 3][j] == ox:
                        return True
                    #diagonal right
                    elif i + 3 <= self.height -1 and\
                    j + 3 <= self.width - 1 and \
                    self.board[i + 1][j + 1] == ox and \
                    self.board[i + 2][j + 2] == ox and \
                    self.board[i + 3][j + 3] == ox:
                        return True
                    #diagonal left
                    elif i + 3 <= self.height - 1 and\
                    j - 3 >= 0 and \
                    self.board[i + 1][j - 1] == ox and \
                    self.board[i + 2][j - 2] == ox and \
                    self.board[i + 3][j - 3] == ox:
                        return True
        return False

     
    def hostGame(self):
        """this is a docstring"""
        print("Welcome to Connect Four!")
        s0 ='X'
        s1 = 'O'
        while self.winsFor(s1) == False:
            print('\n' + self.__str__())
            if s0 == 'X':
                choice = int(input("\nX's choice: "))
                self.addMove(choice, s0)
                s0 = 'O'
                s1 = 'X'
            elif s0 == 'O':
                choice = int(input("\nO's choice: "))
                self.addMove(choice, s0)
                s0 = 'X'
                s1 = 'O'
            else:
                raise Error         
        print('\n\n' + s1 + ' wins -- Congratulations!\n\n' + self.__str__())
    
    
    def __str__(self):
        """this is a docstring"""
        A = ''
        for i in self.board:
            row = ''
            for j in i:
                row += '|' + str(j)
            row += '|\n'
            A += row
        A += '-' * (2 * self.width + 1) + '\n'
        index = ''
        for i in range(self.width):
            index += ' ' + str(i)
        A += index 
        return A
    
        
a = Board(5,6)
a.hostGame()