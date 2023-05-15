import os
import util
from dotenv import load_dotenv
from mastodon import Mastodon, StreamListener


# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)


class PublicTimelineListener(StreamListener):
    """
    A listener for the Mastodon public timeline.
    """
    couchdb_url = os.environ.get('COUCHDB_URL')  # e.g. http://localhost:5984/
    couchdb_username = os.environ.get('COUCHDB_USERNAME')  # e.g. admin
    couchdb_password = os.environ.get('COUCHDB_PASSWORD')  # e.g. password
    mastodon_server_name = os.environ.get('API_BASE_URL').replace('https://', '')  # e.g. https://mastodon.social
    db_to_upload = os.environ.get('DB_TO_UPLOAD')  # e.g. mastodon
    couchdb_url_with_auth = couchdb_url.replace('http://', f'http://{couchdb_username}:{couchdb_password}@')  # add auth
    covid_words = util.get_words_from_file('covid_words.json')  # e.g. ['covid', 'coronavirus']
    election_words = util.get_words_from_file('election_words.json')  # e.g. ['election', 'vote']

    def on_update(self, status):
        """
        Called when a new status arrives.
        :param status: an update from the Mastodon public timeline
        """
        clean_content = util.clean_html(status['content'])  # remove HTML tags
        is_covid = util.is_in(self.covid_words, clean_content)  # check if the status is about COVID-19
        is_election = util.is_in(self.election_words, clean_content)  # check if the status is about the election
        json_to_upload = {
            'created_at': util.to_utc(status['created_at']),
            'url': status['url'],
            'post_id': status['id'],
            'account_id': status['account']['id'],
            'content': clean_content,
            'replies_count': status['replies_count'],
            'reblogs_count': status['reblogs_count'],
            'favourites_count': status['favourites_count'],
            'is_covid': is_covid,
            'is_election': is_election,
            'mastodon_server': self.mastodon_server_name
        }
        try:
            print(util.upload_to_couchdb(self.couchdb_url_with_auth, self.db_to_upload, json_to_upload).json())  # upload to CouchDB
        except Exception as e:
            print(f'Error uploading {json_to_upload} to CouchDB: {e}')

    def handle_heartbeat(self):
        print("Heartbeat received!")


def main():
    api_base_url = os.environ.get('API_BASE_URL')
    token = os.environ.get('TOKEN')
    mastodon = Mastodon(api_base_url=api_base_url, access_token=token)
    listener = PublicTimelineListener()
    mastodon.stream_public(listener)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()
