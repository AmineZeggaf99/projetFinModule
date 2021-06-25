from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import StringField,IntField



class News(Document):
    meta = {"collection": "news"}
    news = StringField()
    source = StringField()
    label = IntField()

class Emotions(Document):
    meta = {"collection": "emotions"}
    text = StringField()
    source = StringField()
    label = IntField()