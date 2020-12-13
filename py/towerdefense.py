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

towers = {'A': [3, 2], 'B': [1, 4], 'C': [2, 2], 'D': [1, 3]}
alians = [30, 14, 27, 21, 13, 0, 15, 17, 0, 18, 26]


def td(path, towers, alians):
    path_length = ''.join(path).count('1') + 1
    print(path_length)
    towers, alians = setUpData(towers,alians,path)
    battle(towers,alians, path, path_length)
    # runTheGauntlet(alians, path_length, towers, path)


def setUpData(towers, alians, path):
    towersv2 = {}
    aliansv2 = list({'hp':alian, 'position':-1-idx} for idx,alian in enumerate(alians))
    for key in towers:
        towersv2[key] = {
            'range': towers[key][0],
            'rate': towers[key][1],
            'position': getTowerPosition(key, path)}
    for key in towersv2:
       towersv2[key]['target_path_idx'] = getAffectedBlocks(towersv2[key])
    return towersv2, aliansv2


def calcTowerDamageOnAlian(tower, affected_blocks):
    rng = tower[0]
    rate = tower[1]
    return (affected_blocks * rate)

def battle(towers, alians, path, path_length):
    print(towers['A'])
    print(';;;;;;;;;;;;;')
    print(alians[-1])

    while alians[-1]['position'] < path_length:
        # each time through the loop is one turn 
        for alian in alians: alian['position'] +=1
        
        print(alians[-1])

    return

def runTheGauntlet(alians, path_length, towers, path):
    tower_positions = getTowerPositions(towers, path)
    path_chords = getPathChords(path)
    for key in towers:
        calcAffectedBlocks(towers[key], tower_positions[key])
    for i in range(path_length + len(alians)):
        alians_positions = calcAlianPositionOnPath(alians, i, path_chords)
        print(alians_positions)
        # calcTowerDamageOnAlian()

    arr = list()
    for alian in alians:
        alian = alian - calcTowerDamageOnAlian(towers['D'], 2)
        arr.append(alian)
    print(arr)

def getAffectedBlocks(tower):
    pos_tower = tower['position']
    path_num = -1
    path_idx = list()
    for h, row in enumerate(path):
        for l, item in enumerate(row):
            if item == '1' or item == '0':
                path_num += 1
                # get distance
                distance = math.sqrt(
                    abs(l-pos_tower[1])**2 + abs(h-pos_tower[0])**2)
                if distance <= tower['range']:
                    print('height:', h, 'length:', l)
                    print('path number', path_num)
                    data_path = {
                        'path_idx':[h,l],
                        'path_position':path_num
                    }
                    path_idx.append(data_path)
    return path_idx

def calcAffectedBlocks(tower, pos_tower):
    # tower = [range,rate] pos_tower = [height, length]
    a = path[pos_tower[0]][pos_tower[1]]
    path_num = -1
    path_idx = list()
    for h, row in enumerate(path):
        for l, item in enumerate(row):
            if item == '1' or item == '0':
                path_num += 1
                # get distance
                distance = math.sqrt(
                    abs(l-pos_tower[1])**2 + abs(h-pos_tower[0])**2)
                if distance <= tower[0]:
                    print('height:', h, 'length:', l)
                    print('path number', path_num)
                    print(a)
                    path_idx.append(path_num)
    return path_idx


def calcAlianPositionOnPath(alians, turn_num, path_chords):
    # alians_positions = list(path_chords[(turn_num-i)] for i, alian in enumerate(alians))
    alians_positions = list()
    for i, alian in enumerate(alians):
        if turn_num - i > -1:
            try:
                path_chords[turn_num-i]
            except:
                alians_positions.append(-1)
            else:
                alians_positions.append(path_chords[turn_num-i])
            # print(alians_positions)
    return alians_positions

# def getAlianPosition(alina_idx)

def getPathChords(path):
    path_chords = list()
    for h, row in enumerate(path):
        for l, item in enumerate(row):
            if item == '1' or item == '0':
                # print('alian pos-->', h,l,i)
                path_chords.append([h, l])
    return path_chords


def getTowerPositions(towers, path):
    tower_positions = {}
    for key in towers:
        for i, row in enumerate(path):
            try:
                row.index(key)
            except:
                None
            else:
                tower_positions[key] = [i, row.index(key)]
    return tower_positions


def getTowerPosition(key, path):
    for i, row in enumerate(path):
        try:
            row.index(key)
        except:
            None
        else:
           return [i, row.index(key)] # height, length


td(path, towers=towers, alians=alians)

# calcAffectedBlocks()


pi = 3.14159
l = 4
h = 1
d = math.sqrt(l**2 + h**2)

# print(d)
