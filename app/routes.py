from flask import Flask , render_template , make_response , request , session , redirect
from . import core
from app import app

db = core.database.Database()

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
        data['ad_category'] = request.form.get('ad_category')
        data['ad-description'] = request.form.get('ad-description')
        data['author-contacts'] = request.form.get('author-contacts')
        print(data)
        response = core.workingWithAds.loadAdToDatabase(data, session)
        print(response, type(response))
        return response

@app.route("/getads", methods=['GET', 'POST'])
def render():
    response = db.secondLoadAdsTable()
    print(response, type(response))
    return response

@app.route("/checkname", methods=['GET', 'POST'])
def checkname():
    response = session['login']
    print(response, type(response))
    return response

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
