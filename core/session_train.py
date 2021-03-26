from . import DATA_DST
from . import database
from flask import Flask , render_template , make_response , request , session , redirect

class Session():
    def __init__(self):
        print('init session')

    def GET(self):
        if 'auth' in session and session['auth']:
            return f"<h1>Привет {session['login']}"
        else:
            return render_template('auth.html')

    def POST(self, login, password):
        db = database.Database()
        result = db.loadUsersTable(login, password)
        if (result and result[2] == password):
                session['login'] = result[1]
                session['id'] = result[0]
                session['category'] = result[3]
                session['auth'] = True
                response = make_response(redirect(f"/auth"))
                return response
        else:
            return render_template('auth.html')
        return result
