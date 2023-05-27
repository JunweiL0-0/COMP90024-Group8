import os,json
import nltk
from summa import keywords
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from nltk.tag import pos_tag
import re
from langdetect import detect
from gensim import corpora, models

# Download necessary resources (only needed for the first time)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')

def extract_keywords(text, num_topics=3, num_keywords=3):
    # Remove URLs
    text = re.sub(r'http\S+', '', text)

    # Tokenize the text into words
    words = word_tokenize(text)

    # Remove stopwords (common words like "the", "is", etc.)
    stop_words = set(stopwords.words('english'))
    filtered_words = [word for word in words if word.casefold() not in stop_words]

    # Remove words containing digits or symbols
    filtered_words = [word for word in filtered_words if not any(c.isdigit() or c in '!@#$%^&*()[]{};:,./<>?\|`~-=_+' for c in word)]

    # Filter out not understandable words and non-English words
    filtered_words = [word for word in filtered_words if len(word) > 2 and detect(word) == 'en']

    # Part-of-speech tagging
    tagged_words = pos_tag(filtered_words)

    # Filter words based on specific POS tags (e.g., nouns, verbs)
    valid_tags = ['NN', 'NNS', 'NNP', 'NNPS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']  # Nouns and verbs
    filtered_words = [word for word, tag in tagged_words if tag in valid_tags]

    # Create a dictionary of words
    dictionary = corpora.Dictionary([filtered_words])

    # Create a corpus of documents (only one in this case)
    corpus = [dictionary.doc2bow(filtered_words)]

    # Train a Latent Dirichlet Allocation (LDA) model with the corpus
    lda_model = models.LdaModel(corpus, num_topics=num_topics, id2word=dictionary)

    # Extract the keywords for each topic
    keywords = []
    for topic in lda_model.show_topics(num_topics=num_topics, num_words=num_keywords, formatted=False):
        keywords.extend([word[0] for word in topic[1]])

    return keywords


sal = json.load(open('sal.json', 'r'))
gccs = list(set([sal[key]['gcc'] for key in sal]))
greater_gccs = [gcc for gcc in gccs if gcc[1] != 'r']
mood_list = ["happy", "love", "good", "great", "excited", "sad", "bad", "angry",
             "tired", "bored"]

def checkGeoValidity(location):
    # Check the "City, State", "Surburb, State" or "Surburb, City" format
    if ',' not in location:
        return False
    else:
        # Extract the suburb and find its gccs
        raw_loc = location.split(',')
        norm_loc = [loc.lower().strip() for loc in raw_loc]
        suburb = norm_loc[0]
        # Check if the suburb is in the 'sal'
        if suburb not in sal:
            return False
        else:
            return suburb



geo_twitter_json_file = open('ready.json', 'r')
counter = 0
write_file = open(f"geo-twitter-{counter}.json", 'w')
json_to_write = {"docs": list()}
for line in geo_twitter_json_file:
    data = json.loads(line)
    suburb = checkGeoValidity(data['doc']['includes']['places'][0]['full_name'])
    if suburb:
        if sal[suburb]['gcc'] in greater_gccs:
            related_tweet = {}
            related_tweet['tweet_id'] = data['id']
            related_tweet['_id'] = data['doc']['_id']
            related_tweet['tags'] = data['value']['tags']
            related_tweet['tokens'] = data['value']['tokens']
            related_tweet['author_id'] = data['doc']['data']['author_id']
            related_tweet['sentiment'] = data['doc']['data']['sentiment']
            related_tweet['text'] = data['doc']['data']['text']
            keyword_list = extract_keywords(data['doc']['data']['text'])
            related_tweet['new_keyword'] = keyword_list
            related_tweet['place'] = data['doc']['includes']['places'][0]['full_name']
            related_tweet['bbox'] = data['doc']['includes']['places'][0]['geo']['bbox']
            related_tweet['created_at'] = data['doc']['data']['created_at']
            related_tweet['reply_count'] = data['doc']['data']['public_metrics']['reply_count']
            related_tweet['retweet_count'] = data['doc']['data']['public_metrics']['retweet_count']
            related_tweet['like_count'] = data['doc']['data']['public_metrics']['like_count']
            related_tweet['is_covid'] = 0
            related_tweet['is_mood'] = 0
            related_tweet['is_election'] = 0
            related_tweet['gcc'] = sal[suburb]['gcc']
            if "covid" in line.lower() or "coronavirus" in line.lower() or 
                "":
                related_tweet['is_covid'] = 1
            if "election" in line.lower():
                related_tweet['is_election'] = 1
            for word in mood_list:
                if word in line.lower():
                    related_tweet['is_mood'] = 1
            json_to_write["docs"].append(related_tweet)
            
    if len(json_to_write["docs"]) > 1000:
        write_file.write(json.dumps(json_to_write))
        json_to_write = {"docs": list()}
        write_file.close()
        counter += 1
        write_file = open(f'geo-twitter-{counter}.json', 'w')
write_file.write(json.dumps(json_to_write))


