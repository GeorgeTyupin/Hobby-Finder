from . import DATA_DST

class Database():
    def __init__(self):
        print('init')

    def loadUsersTable(self, login, password):
        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM users WHERE user_name = '{login}' "
            print(sql)
            result = cur.execute(sql).fetchone()
            print(result)
            if (result and result[2] == password):

                session['login'] = result[1]
                session['id'] = result[0]
                session['category'] = result[3]
                session['description'] = result[4]
                session['auth'] = True

                response = make_response(redirect(f"/"))
                return response
            else:
                return render_template('auth.html')
