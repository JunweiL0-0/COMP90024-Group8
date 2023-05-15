from flask import Response
import json
from uilt import Util


class Model:
    util = Util()

    def get_all_design_from_db(self, db_name):
        """
        The function returns all the designs from a database
        Couchdb will handle most of the errors and return the appropriate response
        The internal server error is handled locally and the response will be sent

        :param db_name: a string value of the database name
        """
        try:
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

    def get_all_dbs(self):
        """
        The function returns all the databases
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

    def get_view(self, db_name, document_name, view_name, request):
        """
        The function returns a view from a database
        Couchdb will handle most of the errors and return the appropriate response
        Internal server will be handled and send

        :param db_name: a string value of the database name
        :param document_name: a string value of the document name
        :param view_name: a string value of the view name
        :param request: a request object
        """
        try:
            couchdb_res = self.util.get_view(db_name, document_name, view_name, request.args)

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

    def save_file(self, data, file_name):
        """
        This function will save file locally and return a valid response

        :param data: a byte array of the file
        :param file_name: a string value of the file name
        """
        try:
            if file_name is None:
                res_to_return = Response()
                res_to_return.response = "File Name is Required"
                res_to_return.headers['Content-Type'] = 'text/plain'
                res_to_return.status_code = 400
                return res_to_return
            elif len(data) == 0:
                res_to_return = Response()
                res_to_return.response = "File is Required"
                res_to_return.headers['Content-Type'] = 'text/plain'
                res_to_return.status_code = 400
                return res_to_return
            else:  # is_jpg
                path_to_write = f"static/{file_name}.jpg"
                file_to_write = open(path_to_write, 'wb')
                file_to_write.write(data)
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

    def retrieve_file(self, file_name):
        """
        This function will retrieve file locally and return a valid response

        :param file_name: a string value of the file name
        """
        try:
            if file_name is None:
                res_to_return = Response()
                res_to_return.response = "File Name is Required"
                res_to_return.headers['Content-Type'] = 'text/plain'
                res_to_return.status_code = 400
                return res_to_return
            else:  # is_jpg
                file_path = f"static/{file_name}.jpg"
                file_to_read = open(file_path, 'rb')
                file_data = file_to_read.read()
                file_to_read.close()

                res_to_return = Response()
                res_to_return.data = file_data
                res_to_return.headers['Content-Type'] = 'image/jpeg'
                res_to_return.status_code = 200
                return res_to_return
        except FileNotFoundError:
            res_to_return = Response()
            res_to_return.response = f"File Not Found: {file_name}.jpg"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 404
            return res_to_return
        except Exception as e:
            res_to_return = Response()
            res_to_return.response = f"Internal Server Error When Retrieving File: {e}"
            res_to_return.headers['Content-Type'] = 'text/plain'
            res_to_return.status_code = 500
            return res_to_return

    def index(self):
        message = {"endpoints": ["/",
                                 "/dbs",
                                 "/<db_name>/designs",
                                 "/<db_name>/_design/<document_name>/_view/<view_name>",
                                 "/upload/jpg/<file_name>",
                                 "/retrieve/jpg/<file_name>"]}
        return Response(json.dumps(message), status=200, mimetype='application/json')
