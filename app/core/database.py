from . import DATA_DST
import sqlite3
import time

class Database():
    def __init__(self):
        print('init database')
        last_time = 0
        self.last_time = last_time
        # self.data = data

    def loadUsersTable(self, login):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM users WHERE user_name = '{login}' "
            result = cur.execute(sql).fetchone()
            print(result)
            return result
    
    def loadAdsTable(self):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM (SELECT * FROM ads ORDER BY time DESC LIMIT 20)"
            save = cur.execute(sql).fetchall()
            if not save:
                return 'not 1'
            result = cur.execute(sql).fetchall()
            self.last_time = result[0][5]
            return result

    def secondLoadAdsTable(self):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM (SELECT * FROM ads WHERE time < '{self.last_time}' ORDER BY time DESC LIMIT 20)"
            save = cur.execute(sql).fetchall()
            print(save)
            if not save:
                return 'not 2'
            result = cur.execute(sql).fetchall()
            self.last_time = result[0][5]
            return result

    def checkingAdForUniqueness(self, data):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM ads WHERE ad_name = '{data['ad_name']}' AND author_id = '{data['author_id']}' "
            result = cur.execute(sql).fetchall()
            if data['author_id'] == result[2] and data['ad_name'] == result[1]:
                return '123'

    def addUser(self, login, password):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"""INSERT INTO users ('user_name' , 'password') 
                VALUES ('{login}','{password}')"""
            cur.execute(sql)
            cur.commit()

    def addAD(self, data):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"""INSERT INTO ads ('ad_name' , 'author_id', 'ad_category', 'ad_description', 'time') 
                VALUES ('{data['ad_name']}','{data['author_id']}','{data['ad_category']}','{data['ad-description']}','{time.time()}')"""
            cur.execute(sql)
            cur.commit()

    def test(self):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM (SELECT * FROM ads WHERE '{time.time()}' < '{self.last_time}' ORDER BY time DESC LIMIT 20)"
            result = cur.execute(sql).fetchall()
            print(result[0][5])
            return '123'
