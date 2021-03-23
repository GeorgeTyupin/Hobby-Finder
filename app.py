from flask import Flask , render_template , make_response , request , session , redirect
import core
# from core import session

app = Flask(__name__)
app.config['SECRET_KEY'] = "f116d0a5491cbe27e7bb07016b694eb4f6a1976e9f9c55621b9c5418567ac02c"

@app.route("/" , methods = ['GET' , 'POST'])
def index():
    if request.method == 'GET':
        core.session_train.GET()
    else:
        core.session_train.POST()

app.run(debug=True)
