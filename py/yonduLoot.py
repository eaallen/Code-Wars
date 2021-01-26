import fibo

fibo.fib(1000)

pirates = int(input('How many pirates:'))


yondo_percent = 0.13
peter_percent = 0.11
crew_count = pirates-2
loot = int(input('how much loot'))

loot_after_crew = loot - (crew_count*3)
print('loot_after_crew', loot_after_crew)

yondu_cut = int(yondo_percent * loot_after_crew)
print('yondu_cut', yondu_cut)

loot_after_yondu = loot_after_crew - yondu_cut
print('loot_after_yondu', loot_after_yondu)

peter_cut = int(loot_after_yondu * peter_percent)
print('peter_cut', peter_cut)

loot_after_peter = loot_after_yondu - peter_cut
print('loot_after_peter', loot_after_peter)

swag = (loot_after_peter-loot_after_peter % (crew_count+2)) / (crew_count+2)

print('swag', swag)
print('RFA', loot_after_peter % (crew_count+2))
print('---->', peter_cut+swag)
