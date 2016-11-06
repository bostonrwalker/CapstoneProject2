
from WealthStream import app
from flask import render_template

@app.route("/")
def index():
    return render_template('index.html')

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, public, max-age=0'
    return r
