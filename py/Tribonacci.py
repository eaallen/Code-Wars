def tribonacci(signature, n):
    if n == 0:
        return []
    original_len = len(signature)
    if n < original_len :
        return signature[0:n]
    for x in range(n-original_len):
        sum_of = sum(signature[len(signature)-3:len(signature)])
        signature.append(sum_of)
    return signature
print(tribonacci([194, 117, 173],489))