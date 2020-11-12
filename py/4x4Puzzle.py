# The height of the skyscrapers is between 1 and 4
# No two skyscrapers in a row or column may have the same number of floors
# A clue is the number of skyscrapers that you can see in a row or column from the outside
# Higher skyscrapers block the view of lower skyscrapers located behind them


def solve_puzzle (clues):
    top = clues[0][0:4]
    right = clues[0][4:8]
    bottom = list(clues[0][8:12])[::-1]
    left = list(clues[0][12:16])[::-1]
    col = list()
    for i in range(len(top)):
        
        print(top[i],right[i])
        print(bottom[i],left[i])
        print('-------')

    return ( (1, 2, 3, 4), (2, 3, 4, 1), (3, 4, 1, 2), (4, 1, 2, 3) )   



clues = (
( 2, 2, 1, 3,  
  2, 2, 3, 1,  
  1, 2, 2, 3,  
  3, 2, 1, 3 ),
( 0, 0, 1, 2,   
  0, 2, 0, 0,   
  0, 3, 0, 0, 
  0, 1, 0, 0 )
)

print(solve_puzzle(clues))