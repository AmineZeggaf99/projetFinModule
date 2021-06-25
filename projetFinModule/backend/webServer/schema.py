import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from mongoengine import connect
from models import News as NewsModel
from models import Emotions as EmotionsModel


class News(MongoengineObjectType):
    class Meta:
        model = NewsModel

class Emotions(MongoengineObjectType):
    class Meta:
        model = EmotionsModel

class Query(graphene.ObjectType):
    news = graphene.List(News)
    emotions = graphene.List(Emotions)

    def resolve_news(self, info):
        return list(NewsModel.objects.all())

    def resolve_emotions(self, info):
        return list(EmotionsModel.objects.all())





CONNECTION_STRING = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
connect('project', host=CONNECTION_STRING, alias='default')
schema = graphene.Schema(query=Query, types=[News,Emotions])
