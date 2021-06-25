import spacy
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import numpy as np

nlp = spacy.load("fr_core_news_sm")
stemmer = SnowballStemmer(language='french')
stopWords = set(stopwords.words('french'))


test = "Bouygues a eu une coupure de réseau à Marseille. J'y vais tout les jours. C'est très joli."


# Tokenization-----------------------------------------------------------------------------------
# returns a list of token, each token is a word f une liste. In french ida kant "J'y" kat7seb as 2 words "J'" and "y"
def return_token(text):
    # Tokeniser la phrase
    doc = nlp(text)
    # Retourner le texte de chaque token
    return [X.text for X in doc]

#print(return_token(text))
#-----------------------------------------------------------------------------------------------

# Tokenization par phrase-----------------------------------------------------------------------
# Cuts sentences when there's a period or chi point d'exclamation
def return_token_sent(text):
    # Tokeniser la phrase
    doc = nlp(text)
    # Retourner le texte de chaque phrase
    return [X.text for X in doc.sents]

#print(return_token_sent(test))
#-----------------------------------------------------------------------------------------------

# stemming--------------------------------------------------------------------------------------

def return_stem(text):
    doc = nlp(text)
    return [stemmer.stem(X.text) for X in doc]

#print(return_stem(test))
#-----------------------------------------------------------------------------------------------

# Lemmatization----------------------------------------------------------------------------------
# Makes all the words to their original form, ex "as" "avoir" etc ...
def return_lemma(text):
    textNLP = nlp(text)
    lem = []
    for token in textNLP:
        lem.append(token.lemma_)
    return lem
#print(return_lemma(test))
#-----------------------------------------------------------------------------------------------

# Stopwords-------------------------------------------------------------------------------------
# this function removes all types of reccurent words in french f7al "le" "une" "as" ....
def return_stopwords(text):
    clean_words = []
    for token in return_token(text):
        if token not in stopWords:
            clean_words.append(token)
    return clean_words

# print(stopWords)
# print(stopwords(test))
#-----------------------------------------------------------------------------------------------

# pos-tag---------------------------------------------------------------------------------------
# it attributes a tag to each word, basically wach verbe awla adjectif awla nom
def return_POS(text):
    # Tokeniser la phrase
    doc = nlp(text)
    # Retourner les étiquettes de chaque token
    return [(X, X.pos_) for X in doc]

#print(return_POS(test))
#-----------------------------------------------------------------------------------------------

# bag of words----------------------------------------------------------------------------------
def return_bow(text):
    texts = text.split(';')
    words = []
    for i in range(len(texts)):
        for word in texts[i].split():
            if word.lower() not in words:
                words.append(word.lower())
    bow = [dict().fromkeys(words, 0) for x in range(len(texts))]
    for i, sentence in enumerate(texts):
        sentence_words = return_token(sentence.lower())
        bag = bow[i]
        for sw in sentence_words:
            for word in words:
                if word == sw:
                    bag[word] += 1
    return bow

#print(return_bow(test))
#-----------------------------------------------------------------------------------------------

# tf-idf----------------------------------------------------------------------------------------



#-----------------------------------------------------------------------------------------------

# word to vector
def return_wtv(text):
    # Tokeniser la phrase
    doc = nlp(text)
    # Retourner le vecteur lié à chaque token
    return [(X.vector) for X in doc]

#print(return_wtv(test))
#-----------------------------------------------------------------------------------------------
