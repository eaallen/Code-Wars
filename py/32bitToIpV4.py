# I must admit i googled this one, very useful tho!
def int32_to_ip(int32):
    return ".".join(map(lambda n: str(int32>>n & 0xFF), [24,16,8,0]))

