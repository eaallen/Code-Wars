import sqlite3
con = sqlite3.connect('highScores.db')
cur = con.cursor()

result  = cur.execute('SELECT * FROM scores ORDER BY score DESC LIMIT 10')

count = 0
for x in result:
  count += 1
  name, score, date = x
  print(count, name, score, date)
    
