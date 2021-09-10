import sqlite3
con = sqlite3.connect('highScores.db')

cur = con.cursor()

# Create table
cur.execute('''CREATE TABLE scores
               (name text, score blob, date text)''')

# Insert a row of data
cur.execute("INSERT INTO scores VALUES ('Eli', 12400,'9/10/2021')")

# Save (commit) the changes
con.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
con.close()