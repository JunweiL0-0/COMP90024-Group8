#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May 16 21:34:38 2023

@author: starry
"""

import json

import util


def main():
    # Geo twitter json file
    geo_twitter_json_file = open('ready.json', 'r')
    # Counter to count the number of tweet
    counter = 0
    # Json to write
    json_to_write = {"docs": list()}
    # sal list, covid words, election words
    sal_list = util.get_sal_data_list('sal.json')
    covid_words = util.get_words('covid_words.json')
    # loop through the file and construct the json
    for line in geo_twitter_json_file:
        data = json.loads(line)  # convert to json
        place_code = util.get_place_code(data['doc']['includes']['places'][0]['full_name'], sal_list)  # get place code
        is_covid = False  # is covid
        is_election = False  # is election
        if place_code is not None:  # if place code is not none
            for covid_relative in covid_words:  # check if covid or election
                if covid_relative in line.lower():
                    is_covid = True
                # if word in election_words:  # if election word
                #     is_election = True
            # construct the json
                    related_tweet = {'tweet_id': data['id'],
                                      '_id': data['doc']['_id'],
                                      'tags': data['value']['tags'],
                                      'author_id': data['doc']['data']['author_id'],
                                      'text': data['doc']['data']['text'],
                                      'tokens': data['value']['tokens'],
                                      'sentiment': data['doc']['data']['sentiment'],
                                      'place_code': place_code,
                                      'bbox': data['doc']['includes']['places'][0]['geo']['bbox'],
                                      'created_at': data['doc']['data']['created_at'],
                                      'reply_count': data['doc']['data']['public_metrics']['reply_count'],
                                      'retweet_count': data['doc']['data']['public_metrics']['retweet_count'],
                                      'like_count': data['doc']['data']['public_metrics']['like_count'],
                                      'is_covid': is_covid,
                                      'is_election': is_election}
                    json_to_write["docs"].append(related_tweet)
                    
        # if we have 1000 tweets, write to a file
        if len(json_to_write["docs"]) > 500:
            print("1")
            write_file = open(f"geo-covidtwitter-{counter}.json", 'w')   # open file
            write_file.write(json.dumps(json_to_write))  # write to file
            json_to_write = {"docs": list()}  # reset json
            write_file.close()  # close file
            counter += 1  # increment counter
    if len(json_to_write["docs"]) > 0:
        write_file = open(f"geo-covidtwitter-{counter}.json", 'w')  # open file and write if there are any data left
        write_file.write(json.dumps(json_to_write))  # write to file
        write_file.close()  # close file
    geo_twitter_json_file.close()  # close file


if __name__ == '__main__':
    main()