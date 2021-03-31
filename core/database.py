from . import DATA_DST
import sqlite3

class Database():
    def __init__(self):
        print('init database')
        # self.data = data

    def loadUsersTable(self, login):
        with sqlite3.connect('database/database.db') as cur:
            sql = f"SELECT * FROM users WHERE user_name = '{login}' "
            result = cur.execute(sql).fetchone()
            return result
    
    def loadAdsTable(self, login):
        with sqlite3.connect('database/database.db') as cur:
            sql = f"SELECT * FROM users WHERE user_name = '{login}' "
            result = cur.execute(sql).fetchone()
            return result

    def addUser(self, login, password):
        with sqlite3.connect("database/database.db") as cur:
            sql = f"""INSERT INTO users ('user_name' , 'password') 
                VALUES ('{login}','{password}')"""
            cur.execute(sql)
            cur.commit()

    def addAD(self, data):
        with sqlite3.connect("database/database.db") as cur:
            sql = f"""INSERT INTO ads ('ad_name' , 'author_id', 'ad_category', 'ad_description') 
                VALUES ('{data['ad_name']}','{data['author_id']}','{data['ad_category']}','{data['ad-description']}')"""
            cur.execute(sql)
            cur.commit()

    def test(self):
        try:
            with sqlite3.connect('database/database.db') as cur:
                sql = f"SELECT * FROM users "
                result = cur.execute(sql).fetchone()
                return result, sql, "База данных без ошибки:", DATA_DST
        except:
            return "Alarm База данных:", DATA_DST
