from typing import final
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from flask_pymongo import pymongo
from flask_graphql import GraphQLView
from schema import schema
import json

import os,sys

from nlp import return_token,return_token_sent,return_stem,return_bow,return_lemma,return_POS,return_stopwords,return_wtv




app = Flask(__name__)
CORS(app)
app.debug = True


@app.route("/")
def index():
    return "Hello world"


############## NLP ROUTES #################

@app.route('/nlp', methods=['POST'])
def nlp():
    jsonData = request.get_json(force=True)

    text = jsonData['text']
    option = jsonData['option']
    finalResult = None

    if option == "tokenWord":
        finalResult = return_token(text)
    elif option == "tokenSentence":
        finalResult = return_token_sent(text)
    elif option == "stem":
        finalResult = return_stem(text)
    elif option == "bow":
        finalResult = return_bow(text)
    elif option == "lemma":
        finalResult = return_lemma(text)
    elif option == "pos":
        finalResult = return_POS(text)
    elif option == "stopWords":  
        finalResult = return_stopwords(text)
    elif option == "wordToVector":  
        finalResult = return_wtv(text)

    response = jsonify({"data": finalResult})
    return response


#########################NewsDetectorRoute####################

@app.route('/detectFakeNews' ,methods=['POST'])
def detectFakeNews():
    jsonData = request.get_json(force=True)

    news = jsonData['news']

    os.chdir('C:\\Users\\amine\\Desktop\\projetFinModule\\backend\\ML_Models\\fakeNews')

    sys.path.append('C:\\Users\\amine\\Desktop\\projetFinModule\\backend\\ML_Models\\fakeNews')

    from newsTrainLoad import detectFakeNews

    finalResult= detectFakeNews(news)


    response = jsonify({"data": finalResult})

    return response


#########################EmotionsDetectorRoute####################


@app.route('/detectEmotions' ,methods=['POST'])
def detectEmotions():
    jsonData = request.get_json(force=True)

    text = jsonData['text']
    sys.path.append('C:/Users/amine/Desktop/projetFinModule/backend/ML_Models/Emotions')
    os.chdir('C:/Users/amine/Desktop/projetFinModule/backend/ML_Models/Emotions')

    from emotionModelLoad import emotionDetector

    finalResult=emotionDetector(text)


    
    response = jsonify({"data": finalResult})

    return response


# GRAPHQL---------------------------------------------------
app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)
# ----------------------------------------------------------



