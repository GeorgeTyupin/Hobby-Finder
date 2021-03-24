from flask import Flask , render_template , make_response , request , session , redirect
import core
# from core import session

db = core.database.Database()
ses = core.session_train.Session()
print(db.test())
# print(ses.POST('qwerty', '123'))

app = Flask(__name__)
app.config['SECRET_KEY'] = "f116d0a5491cbe27e7bb07016b694eb4f6a1976e9f9c55621b9c5418567ac02c"

@app.route("/" , methods = ['GET' , 'POST'])
def index(ses):
    if request.method == 'GET':
        # ses = core.session_train.Session()
        return ses.GET()
    else:
        # ses = core.session_train.Session()
        login = request.form.get('user_name')
        password = request.form.get('user_password')
        return ses.POST(login, password)

app.run(debug=True)
