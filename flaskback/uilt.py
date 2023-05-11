import requests
from couchdb2 import Server, CreationError
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)


class Util:
    """
        Using pure http requests library to communicate with couchdb
        Avoid the need to install couchdb2 library
        This implementation will strictly follow the couchdb api documentation.
    """
    host_url = os.environ.get('HOST')
    username = os.environ.get('USERNAME')
    password = os.environ.get('PASSWORD')
    base_url = f"http://{username}:{password}@{host_url}"

    def get_all_designs(self, db_name):
        """
        GET /{db}/_design_docs

        :param db_name: a string represent the name of the db
        :return: a json object represent the design of the db
        """
        return requests.get(f"{self.base_url}/{db_name}/_design_docs")

    def get_view(self, db_name, document_name, view_name, reduce=True, group_level=1):
        """
        GET /{db}/_design/{ddoc}/_view/{view}

        :param db_name: a string represent the name of the db
        :param document_name: a string represent the name of the document
        :param view_name: a string represent the name of the view
        :param reduce: a boolean represent whether to reduce the result
        :param group_level: an integer represent the level of grouping
        :return: a json object represent the view of the db
        """
        return requests.get(f"{self.base_url}/{db_name}/_design/{document_name}/_view/{view_name}?reduce={reduce}&group_level={group_level}")

    def get_all_dbs(self, ):
        """
        GET /_all_dbs

        :return: a json object represent all the dbs
        """
        return requests.get(f"{self.base_url}/_all_dbs")
