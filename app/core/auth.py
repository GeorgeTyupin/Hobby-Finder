from . import DATA_DST
from . import database
from flask import Flask, render_template, make_response, request, session, redirect
print('init')

def GET(session):
    if 'auth' in session and session['auth']:
        return make_response(redirect(f"/"))
    else:
        return render_template('auth.html')
        
def POST(session, login, password):
    db = database.Database()
    result = db.loadUsersTable(login)
    if (result and result[2] == password):
            session['login'] = result[1]
            session['id'] = result[0]
            session['category'] = result[3]
            session['auth'] = True
            response = make_response(redirect(f"/"))
            return response
    else:
        return render_template('auth.html')
    return result
