import json
import re
import requests


def upload_to_couchdb(couchdb_url_with_auth, db_to_upload, json_to_upload):
    """Upload documents to the CouchDB database."""
    return requests.post(f'{couchdb_url_with_auth}/{db_to_upload}', json=json_to_upload)


def clean_html(raw_html):
    cleaner = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
    clean_text = re.sub(cleaner, '', raw_html)
    return clean_text


def get_words_from_file(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)['words']
        return data


def to_utc(dt):
    iso8601_str = dt.strftime("%Y-%m-%dT%H:%M:%S.000Z")
    return iso8601_str


def is_in(related_words, content_text):
    for word in [x.lower() for x in content_text.split()]:
        if word in related_words:
            return True
    return False
