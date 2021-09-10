import sqlite3

def insertHighScore(name, score, date):
  con = sqlite3.connect('highScores.db')
  cur = con.cursor()
  sql = f'INSERT INTO scores VALUES (\'{name}\', {score},\'{date}\')'
  cur.execute(sql)
  con.commit()
  con.close()
  return 

insertHighScore('Alex', -12, '1/1/2021')
insertHighScore('Alex', -122, '1/1/2021')
insertHighScore('Alex', -1222, '1/1/2021')
insertHighScore('Alex', -12, '1/1/2021')
insertHighScore('Alex', -122, '1/1/2021')
insertHighScore('Alex', -1222, '1/1/2021')
insertHighScore('Alex', -12, '1/1/2021')
insertHighScore('Alex', -122, '1/1/2021')
insertHighScore('Alex', -1222, '1/1/2021')
insertHighScore('Alex', -12, '1/1/2021')
insertHighScore('Alex', -122, '1/1/2021')
insertHighScore('Alex', -1222, '1/1/2021')
insertHighScore('Alex', -12, '1/1/2021')
insertHighScore('Alex', -122, '1/1/2021')
insertHighScore('Alex', -1222, '1/1/2021')
