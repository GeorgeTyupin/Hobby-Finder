from . import DATA_DST

def GET():
    if request.method == 'GET':
        if 'auth' in session and session['auth']:
            return f"<h1>Привет {session['login']}"
        else:
            return render_template('auth.html')

def POST():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('pass')

        with sqlite3.connect(DATA_DST) as cur:
            sql = f"SELECT * FROM users WHERE user_name = '{login}' "
            print(sql)
            result = cur.execute(sql).fetchone()
            print(result)
            if (result and result[3] == password):

                session['login'] = result[2]
                session['id'] = result[0]
                session['color'] = result[4]
                session['auth'] = True

                response = make_response(redirect(f"/"))
                return response
            else:
                return render_template('auth.html')
        return "123"