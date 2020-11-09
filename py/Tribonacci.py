def tribonacci(signature, n):
    for x in range(n):
        sum_of = sum(signature,len(signature)-3)
        print (sum_of)
        signature.append(sum_of)
    return signature
print(tribonacci([0,0,1],6))