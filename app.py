from flask import Flask , render_template , make_response , request , session , redirect
import core

db = core.database.Database()
print(db.test())

app = Flask(__name__)
app.config['SECRET_KEY'] = "f116d0a5491cbe27e7bb07016b694eb4f6a1976e9f9c55621b9c5418567ac02c"

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        data = db.loadAdsTable()
        print(data)
        return render_template('index.html', data = data)
    else:
        data = {}
        data['ad_name'] = request.form.get('ad_name')
        data['ad_category'] = request.form.get('ad_name')
        data['ad-description'] = request.form.get('ad-description')
        print(data)
        return core.workingWithAds.loadAdToDatabase(data, session)

@app.route("/getdata", methods=['GET', 'POST'])
def render():
    return '123'

@app.route("/auth" , methods = ['GET' , 'POST'])
def auth():
    if request.method == 'GET':
        return core.auth.GET(session)
    else:
        login = request.form.get('user_name')
        password = request.form.get('user_password')
        return core.auth.POST(session, login, password)

@app.route("/reg", methods=['GET', 'POST'])
def reg():
    if request.method == 'GET':
        return render_template('reg.html')
    else:
        login = request.form.get('user_name')
        password = request.form.get('user_password')
        return core.reg.POST(session, login, str(password))

app.run(debug=True)
