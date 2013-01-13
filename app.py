import os
from flask import Flask
from app.controllers.applicationController import index

app = Flask(__name__, template_folder="app/templates/")
app.debug = True

def connect_db():
    try:
        pass
        #return HDButil.getconnection("SCHEMANAME")
    except dbapi.Error, err:
        print(err)


def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().execute(f.read())
        db.commit()


#@app.before_request
#def before_request():
    #pass
    ##g.db = connect_db()


#@app.after_request
#def after_request(response):
    #pass
    ##g.db.close()
    ##return response

app.register_blueprint(index)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
