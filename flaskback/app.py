from flask import Flask, request
from flask_cors import CORS
from model import Model

app = Flask(__name__)
cors = CORS(app, origins=['*'])  # Allow all origins
model = Model()


@app.route('/', methods=['GET'])
def index():
    """
    The function returns all the endpoints
    """
    return model.index()


@app.route('/dbs', methods=['GET'])
def dbs():
    """
    The function returns all the databases
    """
    return model.get_all_dbs()


@app.route('/<db_name>/designs', methods=['GET'])
def designs(db_name):
    """
    The function returns all the designs from a database
    """
    return model.get_all_design_from_db(db_name)


@app.route('/upload/jpg/<file_name>', methods=['PUT'])
def upload_jpg(file_name):
    """
    The function store a jpg file to the server
    """
    return model.save_file(request.data, file_name)


@app.route('/retrieve/jpg/<file_name>', methods=['GET'])
def retrieve_jpg(file_name):
    """
    The function retrieve a jpg file from the server
    """
    return model.retrieve_file(file_name)


@app.route('/<db_name>/_design/<document_name>/_view/<view_name>', methods=['GET'])
def view(db_name, document_name, view_name):
    """
    The function returns a view from a database's design document
    """
    return model.get_view(db_name, document_name, view_name, request)


if __name__ == '__main__':
    """
    The main function
    """
    app.run(debug=False, port=8080, host='0.0.0.0')
