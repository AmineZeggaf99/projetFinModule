import pymongo
import os
import sys







sys.path.append('C:\\Users\\amine\\Desktop\\projetFinModule\\backend\\Scrapping')
from scrapEmotions import scrapForMe

from scrapFakeNews import scrapNewsGlobal

##### Connection with mongoDb
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["project"]

########################Sentiment Analysis###############################

######Scrap the data
data=scrapForMe()
###### Clean the data########
i=0
for element in data:
    element=element[0].strip()
    element=element.replace('"','"')
    element=element.replace("\xa0","")
    element=element.replace("“","")
    element=element.replace("”","")
    element=element.replace("«","")
    element=element.replace("»","")
    element=element.replace("?","")
    element=element.replace("!","")
    element=element.replace("'","")
    data[i][0]=element
    i=i+1

##########Target the collection
mycol = mydb["emotions"]
j=0
#Feed Mongo
for element in data:
    mydict = { "text": element[0], "source": element[1],"label":element[2] }
    store = mycol.insert_one(mydict)
    print(j)
    j=j+1
#################################################################

###########################News###############################

newsData=scrapNewsGlobal()
###### Clean the data########
i=0
for element in newsData:
    element=element[0].strip()
    element=element.replace('"','"')
    element=element.replace("\xa0","")
    element=element.replace("“","")
    element=element.replace("”","")
    element=element.replace("«","")
    element=element.replace("»","")
    element=element.replace("?","")
    element=element.replace("!","")
    element=element.replace("'","")
    data[i][0]=element
mycol = mydb["news"]
j=0
for element in newsData:
    mydict = { "news": element[0], "source": element[1],"label":element[2] }
    store = mycol.insert_one(mydict)
    print(j)
    j=j+1

########################News###############################


