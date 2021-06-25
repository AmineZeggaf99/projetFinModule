from mongoengine import connect
from models import Article

connect("project", host="mongomock://localhost", alias="default")


