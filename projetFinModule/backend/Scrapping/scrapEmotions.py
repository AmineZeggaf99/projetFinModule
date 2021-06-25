import requests
from bs4 import BeautifulSoup
import csv 
import os
import re

os.chdir('C://Users//amine//Desktop')



def scrapForMe():

    baseLink='https://fr.trustpilot.com/review/'
    sources=['fnac.com','amazon.fr','cdiscount.com']
    myList=[]
    for source in sources:
        
        j=2
        for j in range(2,11):
            label=0
            page = requests.get(baseLink+'www.'+source+'?page='+str(j)+'&stars=1')


            soup = BeautifulSoup(page.content, 'html.parser')

            h2s=soup.find_all('h2', {"class": 'review-content__title'})

            for h2 in h2s:
                a=h2.find('a')
                badReview=a.text
                badReview.strip()
                badReview = " ".join(re.split("\s+", badReview, flags=re.UNICODE))
                badReview=badReview.replace("\xa0","")
                myList.append([badReview,source,label])
            print('One bad review page finished ',j)
            label=1
            page = requests.get(baseLink+'www.'+source+'?page='+str(j)+'&stars=5')
            soup = BeautifulSoup(page.content, 'html.parser')

            ps=soup.find_all('p', {"class": 'review-content__text'})
            for p in ps:
                goodReview=p.text
                goodReview=goodReview.replace("\xa0","")
                goodReview.strip()
                goodReview = " ".join(re.split("\s+", goodReview, flags=re.UNICODE))                
                myList.append([goodReview,source,label])
            print('One good review page finished ',j)
    
    return myList


def saveData(dataList):

  with open('data2.csv', 'a+',encoding="utf-8",newline='') as f: 
      write = csv.writer(f,delimiter=';') 
      write.writerows(dataList) 

saveData(scrapForMe())