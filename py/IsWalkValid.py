def is_valid_walk(walk):
    if len(walk)!=10: return False
    n = list(filter(lambda x: x=='n',walk))
    s = list(filter(lambda x: x=='s',walk))
    e = list(filter(lambda x: x=='e',walk))
    w = list(filter(lambda x: x=='w',walk))
    print(len(n), len(s))
    if len(n) == len(s) and len(e) == len(w):
        return True
    return False