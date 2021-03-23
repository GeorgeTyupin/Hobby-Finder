from . import DATA_DST
print(DATA_DST)

def GET():
    if request.method == 'GET':
        if 'auth' in session and session['auth']:
            return f"<h1>Привет {session['login']}"
        else:
            return render_template('auth.html')

def POST():
    if request.method == 'POST':
        login = request.form.get('user_name')
        password = request.form.get('user_password')
        db = database.Database()
        db.loadUsersTable(login, password)
        return "123"