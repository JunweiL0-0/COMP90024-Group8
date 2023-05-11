from flask import Flask, request
from flask_cors import CORS
from model import Model

app = Flask(__name__)
cors = CORS(app, origins=['*'])
model = Model()


@app.route('/', methods=['GET'])
def index():
    return model.index()


@app.route('/designs', methods=['GET'])
def designs():
    return model.get_all_design_from_db(request)


@app.route('/dbs', methods=['GET'])
def dbs():
    return model.get_all_dbs(request)


@app.route('/view', methods=['GET'])
def view():
    return model.get_view(request)


@app.route('/upload/pdf', methods=['PUT'])
def upload_pdf():
    return model.save_file(request, is_pdf=True)


@app.route('/upload/jpg', methods=['PUT'])
def upload_jpg():
    return model.save_file(request, is_jpg=True)


@app.route('/retrieve/pdf', methods=['GET'])
def retrieve_pdf():
    return model.retrieve_file(request, is_pdf=True)


@app.route('/retrieve/jpg', methods=['GET'])
def retrieve_jpg():
    return model.retrieve_file(request, is_jpg=True)


if __name__ == '__main__':
    app.run(debug=False, port=8080, host='0.0.0.0')
