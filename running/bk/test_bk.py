import os,json

geo_twitter_json_file = open('ready.json', 'r')
counter = 0
write_file = open(f"geo-twitter-{counter}.json", 'w')
json_to_write = {"docs": list()}
for line in geo_twitter_json_file:
    data = json.loads(line)
    related_tweet = {}
    related_tweet['tweet_id'] = data['id']
    related_tweet['tags'] = data['value']['tags']
    related_tweet['tokens'] = data['value']['tokens']
    related_tweet['author_id'] = data['doc']['data']['author_id']
    related_tweet['sentiment'] = data['doc']['data']['sentiment']
    related_tweet['text'] = data['doc']['data']['text']
    related_tweet['place'] = data['doc']['includes']['places'][0]['full_name']
    related_tweet['bbox'] = data['doc']['includes']['places'][0]['geo']['bbox']
    related_tweet['created_at'] = data['doc']['data']['created_at']
    related_tweet['reply_count'] = data['doc']['data']['public_metrics']['reply_count']
    related_tweet['retweet_count'] = data['doc']['data']['public_metrics']['retweet_count']
    related_tweet['like_count'] = data['doc']['data']['public_metrics']['like_count']
    json_to_write["docs"].append(related_tweet)
    if len(json_to_write["docs"]) > 1000:
        write_file.write(json.dumps(json_to_write))
        json_to_write = {"docs": list()}
        write_file.close()
        counter += 1
        write_file = open(f'geo-twitter-{counter}.json', 'w')
write_file.write(json.dumps(json_to_write))
