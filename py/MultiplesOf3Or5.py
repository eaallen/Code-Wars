def solution(number):
    arr3 = list(x for x in range(number) if x%3==0)
    arr5 = list(x for x in range(number) if x%5==0)
    return sum(list(set(arr3) | set(arr5)))

print(solution(10))