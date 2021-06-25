import pymongo
import os
import json
######################### Its important to pip install elastic-loader
os.chdir('C:/Users/amine/Desktop/projetFinModule/backend/ElasticsSearchSync')

###### Class to create and manipulate dictionary 
class create_dict(dict): 
  
    # __init__ function 
    def __init__(self): 
        self = dict() 
          
    # Function to add key:value 
    def add(self, key, value): 
        self[key] = value 

######################################SYNC NEWS FROM MONGODB TO ELASTIC

#######Make The Connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
###################Choosing db and collection
mydb = client["project"]
mycol = mydb["news"]

data=mycol.find()
        
mydict = create_dict()


####### Feed the list from mongodb
i = 1
mylist=[]
for y in mycol.find():
    mylist.append({"news":y['news'],"source":y['source'],"label":y['label']})
    i = i+1

######### write json object to json file
test_json=json.dumps(mylist)



with open('news.json', 'w', encoding='utf-8') as f:

    f.write(test_json + '\n')
#############Checking if I am in the correct directory
print("Current working directory: {0}".format(os.getcwd()))

######################Delete old index
cmd1=os.system("curl -XDELETE localhost:9200/news")
########################Import Json file to Elastic
cmd2=os.system("elasticsearch_loader --index news --type news json news.json")
################## Check the status of the command
if(cmd1==0 and cmd2==0):
    print("News Synchorization successful")
else:
    print("Error")


######################################SYNC EMOTIONS FROM MONGODB TO ELASTIC

mydb = client["project"]
mycol = mydb["emotions"]

        
mydict = create_dict()


####### Feed the list from mongodb
i = 1
mylist=[]
for y in mycol.find():
    mylist.append({"text":y['text'],"source":y['source'],"label":y['label']})
    i = i+1

######### write json object to json file
test_json=json.dumps(mylist)



with open('emotions.json', 'w', encoding='utf-8') as f:

    f.write(test_json + '\n')


######################Delete old index
cmd1=os.system("curl -XDELETE localhost:9200/emotions")

########################Import Json file to Elastic

cmd2=os.system("elasticsearch_loader --index emotions --type emotions json emotions.json")
################## Check the status of the command
if(cmd1==0 and cmd2==0):
    print("Emotions Synchorization successful")
else:
    print("Error")
