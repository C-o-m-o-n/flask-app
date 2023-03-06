import mysql.connector
mydb = mysql.connector.connect(
  host='Comon.mysql.pythonanywhere-services.com',
  user='comon',
  passwd='azPassword09',
  )
  
my_cursor = mysql.connector.mydb
my_cursor.execute("CREATE  DATABASE testdatabase")
my_cursor.execute("SHOW DATABASES")
for db in my_cursor:
  print(db)