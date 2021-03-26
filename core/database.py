from . import DATA_DST
import sqlite3

class Database():
    # data = DATA_DST
    def __init__(self):
        print('init database')
        # self.data = data

    def loadUsersTable(self, login, password):
        with sqlite3.connect('database/database.db') as cur:
            sql = f"SELECT * FROM users WHERE user_name = '{login}' "
            result = cur.execute(sql).fetchone()
            return result
             
    def test(self):
        try:
            with sqlite3.connect('database/database.db') as cur:
                sql = f"SELECT * FROM users "
                result = cur.execute(sql).fetchone()
                return result, sql, "База данных без ошибки:", DATA_DST
        except:
            return "Alarm База данных:", DATA_DST