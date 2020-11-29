import math
path = [
    '0111111',
    '  A  B1',
    ' 111111',
    ' 1     ',
    ' 1C1111',
    ' 111 D1',
    '      1'
]

towers = {'A':[3,2],'B':[1,4],'C':[2,2],'D':[1,3]}
alians = [30,14,27,21,13,0,15,17,0,18,26]

def td(path, towers, alians):
    path_length = ''.join(path).count('1') + 1
    alian_hp = alians
    print(path_length)
    runTheGauntlet(alians, path_length, towers, path)
    print()


def calcTowerDamageOnAlian(tower, affected_blocks):
    rng = tower[0]
    rate = tower[1]
    return (affected_blocks * rate)

def runTheGauntlet(alians, path_length, towers, path):
    tower_positions = getTowerPositions(towers,path)
    for key in towers:
        calcAffectedBlocks(towers[key], tower_positions[key])
    for i in range(path_length + len(alians)):
        alians_positions =  calcAlianPositionOnPath(alians,i)
        
        # calcTowerDamageOnAlian()

    arr = list()
    for alian in alians:
        alian = alian - calcTowerDamageOnAlian(towers['D'],2)
        arr.append(alian)
    print(arr)

def calcAffectedBlocks(tower, pos_tower):
    # tower = [range,rate] pos_tower = [height, length]
    a = path[pos_tower[0]][pos_tower[1]]
    path_num = -1
    for h,row in enumerate(path):
        for l,item in enumerate(row):
            if item == '1' or item == '0':
                path_num+=1
                # get distance 
                distance = math.sqrt(abs(l-pos_tower[1])**2 + abs(h-pos_tower[0])**2)
                if distance <= tower[0]:
                    print('we got em',h,l, distance,tower[0])
                    print('path number', path_num)
                    print(a)
    return
def calcAlianPositionOnPath(alians, turn_num):
    alians_positions = list(turn_num-i for i, alian in enumerate(alians))
    return alians_positions

def getTowerPositions(towers,path):
    tower_positions = {}
    for key in towers:
        for i,row in enumerate(path):
            try:
                row.index(key)
            except: None
            else:
                tower_positions[key] = [i,row.index(key)]
    return tower_positions

td(path,towers=towers, alians=alians)

calcAffectedBlocks()


pi = 3.14159
l=4
h=1
d=math.sqrt(l**2 + h**2)

# print(d)