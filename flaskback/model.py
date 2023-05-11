from flask import Response
import json
from uilt import Util


class Model:
    util = Util()

    def index(self):
        message = {'message': "Welcome! Please use the following endpoints:", 'endpoints': []}
        message['endpoints'].append('/designs: to retrieve all the designs from a database. Please provide the db '
                                    'name as a query parameter. eg: /designs?db=example')
        message['endpoints'].append('/dbs: to retrieve all the databases')
        message['endpoints'].append('/view: to retrieve a view from a database. Please provide the db name as a query '
                                    'parameter. eg: /view?db=example?document=example_doc?view=example_view')
        message['endpoints'].append('/upload/pdf: to upload a pdf file. Please provide the file name as a query '
                                    'parameter. eg: /upload/pdf?file_name=example.pdf')
        message['endpoints'].append('/upload/jpg: to upload a jpg file. Please provide the file name as a query '
                                    'parameter. eg: /upload/jpg?file_name=example.jpg')
        message['endpoints'].append('/retrieve/pdf: to retrieve a pdf file. Please provide the file name as a query '
                                    'parameter. eg: /retrieve/pdf?file_name=example.pdf')
        message['endpoints'].append('/retrieve/jpg: to retrieve a jpg file. Please provide the file name as a query '
                                    'parameter. eg: /retrieve/jpg?file_name=example.jpg')
        return Response(json.dumps(message), status=200, mimetype='application/json')

    def get_all_design_from_db(self, request):
        """
        The function returns all the designs from a database
        Couchdb will handle most of the errors and return the appropriate response
        The internal server error is handled locally and the response will be sent

        :param request: a request object
        """
        try:
            db_name = request.args.get('db')
            couchdb_res = self.util.get_all_designs(db_name)

            res_to_return = Response()
            res_to_return.response = couchdb_res
            res_to_return.headers['Content-Type'] = 'application/json'
            res_to_return.status_code = couchdb_res.status_code
            return res_to_return
        except Exception as e:
            res_to_return = Response()
            res_to_return.response = f"Internal Server Error When Fetching Design: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 500
            return res_to_return

    def get_all_dbs(self, request):
        """
        The function returns all the databases

        :param request: a request object
        """
        try:
            couchdb_res = self.util.get_all_dbs()

            res_to_return = Response()
            res_to_return.response = couchdb_res
            res_to_return.headers['Content-Type'] = 'application/json'
            res_to_return.status_code = couchdb_res.status_code
            return res_to_return
        except Exception as e:
            res_to_return = Response()
            res_to_return.response = f"Internal Server Error When Fetching DB: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 500
            return res_to_return

    def get_view(self, request):
        """
        The function returns a view from a database
        Couchdb will handle most of the errors and return the appropriate response
        Internal server will be handled and send

        :param request: a request object
        """
        try:
            db_name = request.args.get('db')
            document_name = request.args.get('document')
            view_name = request.args.get('view')
            couchdb_res = self.util.get_view(db_name, document_name, view_name)

            res_to_return = Response()
            res_to_return.response = couchdb_res
            res_to_return.headers['Content-Type'] = 'application/json'
            res_to_return.status_code = couchdb_res.status_code
            return res_to_return
        except Exception as e:
            res_to_return = Response()
            res_to_return.response = f"Internal Server Error When Get View: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 500
            return res_to_return

    def save_file(self, request, is_pdf=False, is_jpg=False):
        """
        This function will save file locally and return a valid response

        :param request: a request object
        :param is_pdf: a boolean value to check if the file is pdf
        :param is_jpg: a boolean value to check if the file is jpg
        """
        try:
            if is_pdf:
                path_to_write = f"static/{request.args.get('file_name')}.pdf"
            else:  # is_jpg
                path_to_write = f"static/{request.args.get('file_name')}.jpg"
            file_to_write = open(path_to_write, 'wb')
            file_to_write.write(request.data)
            file_to_write.close()

            res_to_return = Response()
            res_to_return.response = "File Created"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 201
            return res_to_return

        except Exception as e:
            res_to_return = Response()
            res_to_return.response = f"Internal Server Error When Saving File: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 500
            return res_to_return

    def retrieve_file(self, request, is_jpg=False, is_pdf=False):
        """
        This function will retrieve file locally and return a valid response

        :param request: a request object
        :param is_jpg: a boolean value to check if the file is jpg
        :param is_pdf: a boolean value to check if the file is pdf
        """
        try:
            if is_pdf:
                file_path = f"static/{request.args.get('file_name')}.pdf"
            else:  # is_jpg
                file_path = f"static/{request.args.get('file_name')}.jpg"
            file_to_read = open(file_path, 'rb')
            file_data = file_to_read.read()
            file_to_read.close()

            res_to_return = Response()
            res_to_return.data = file_data
            res_to_return.headers['Content-Type'] = 'application/pdf' if is_pdf else 'image/jpeg'
            res_to_return.status_code = 200
            return res_to_return
        except FileNotFoundError as e:
            res_to_return = Response()
            res_to_return.response = f"File Not Found: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 404
            return res_to_return
        except Exception as e:
            res_to_return = Response()
            res_to_return.response = f"Internal Server Error When Retrieving File: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 500
            return res_to_return
