import requests
from bs4 import BeautifulSoup
import csv 
import os
from urllib.parse import urlparse

#os.chdir('C://Users//amine//Desktop')
print("Current working directory: {0}".format(os.getcwd()))

def scrapNewsGlobal():

  allNews=[]
  def scrapForMe(link,htmlTag,subHtmlTag,className,label,condition):
    page = requests.get(link)

    domain=urlparse(link).netloc
    source=domain.replace('www.','')
    soup = BeautifulSoup(page.content, 'html.parser')


    mylist=[]
    if(htmlTag=='div' ):
      mydivs = soup.find_all("div", {"class": className})
      for element in mydivs:
        links = element.findAll(subHtmlTag)
        for a in links:
          if(label==0):
            fakeNews=a.text
            if(condition=='condition1'):
              listTxt=fakeNews.split(' ')
              if('MYTHE' not in listTxt):
                continue
            fakeNews=fakeNews.replace("Mythe n°","")
            fakeNews=fakeNews.replace("/ «","")
            fakeNews=fakeNews.replace("»","")
            fakeNews=fakeNews.replace("MYTHE : ","")
            fakeNews=fakeNews.replace("“","")
            fakeNews=fakeNews.replace("”","")
            fakeNews=fakeNews.replace('Non, ','')
            fakeNews=fakeNews.replace('NON, ','')
            fakeNews=fakeNews.replace('Non,','')
            fakeNews=fakeNews.replace('NON,','')
            fakeNews=fakeNews.replace("n’","")
            fakeNews=fakeNews.replace("N’","")
            fakeNews=fakeNews.replace("N'","")
            fakeNews=fakeNews.replace("n'","")
            fakeNews=fakeNews.replace("\xa0","")

            listTxt=fakeNews.split(' ')

            for element in listTxt:
              if(element== 'ne' or element== 'pas' or element== 'ni' or element== 'NE' or element== 'PAS' or element== 'NI' ):
                listTxt.remove(element)



            listToStr = ' '.join(map(str, listTxt))
            print(listToStr)
            mylist.append([listToStr,source,label])
            allNews.append([listToStr,source,label])
    elif(htmlTag=='tr' ):
      tr = soup.find_all('td')
      for element in tr:
        for subelement in element:
          if(len(subelement.text)>7):
            fakeNews=subelement.text.replace("\xa0","")
            mylist.append([fakeNews,source,label])
            allNews.append([fakeNews,source,label])
    elif(condition=='condition2'):
    
      print('lol')
      div = soup.find("div", {"class": "td_block_wrap tdb_single_content tdi_81 td-pb-border-top td_block_template_1 td-post-content tagdiv-type"})
      subdiv = div.find("div", {"class": className})
      #print(div)
      uls=div.find_all('ul')
      #print(len(uls))
      for ul in uls:
        fakeNews=ul.find('li')
        
        nearSpan=ul.findNext('p').find('b').find('span')
        
        labelNews=str(nearSpan)
        labelNews=labelNews.replace('<span style="color: #ff0000">','')
        labelNews=labelNews.replace('</span>','')
        labelNews=labelNews.replace('<b>','')
        labelNews=labelNews.replace('</b>','')

  



  
    print(len(mylist))
    print('----------FINISHED----------------------')
    return mylist

  def scrapMultiplePages(nbrPages,site,label):
    
    if(site=='1') :
      mylist=[]
      domain=urlparse('https://ici.radio-canada.ca/theme/281/fausses-nouvelles/').netloc
      source=domain.replace('www.','')
      for j in range(1,nbrPages+1):
        
      
        
        page = requests.get('https://ici.radio-canada.ca/theme/281/fausses-nouvelles/'+str(j))
        soup = BeautifulSoup(page.content, 'html.parser')

        mydivs = soup.find_all("div", {"class": 'content-text'})
        for element in mydivs:
          categ=element.find('span').text.split(' ')
          if('COVID-19' in categ or 'Coronavirus' in categ):
            fakeNews=element.find('a').text
            fakeNews=fakeNews.replace('Non, ','')
            fakeNews=fakeNews.replace('NON, ','')
            fakeNews=fakeNews.replace('Non,','')
            fakeNews=fakeNews.replace('NON,','')
            fakeNews=fakeNews.replace("n’","")
            fakeNews=fakeNews.replace("N’","")
            fakeNews=fakeNews.replace("N'","")
            fakeNews=fakeNews.replace("n'","")
            fakeNews=fakeNews.replace("\xa0","")

            listTxt=fakeNews.split(' ')

            for element in listTxt:
              if(element== 'ne' or element== 'pas' or element== 'ni' or element== 'NE' or element== 'PAS' or element== 'NI' ):
                listTxt.remove(element)
            listToStr = ' '.join(map(str, listTxt))
            mylist.append([listToStr,source,label])
            allNews.append([listToStr,source,label])
      print(len(mylist))
      print('----------FINISHED----------------------')
      return(mylist)
    elif (site=='2'):
      mylist=[]
      domain=urlparse('https://fl24.net/page/').netloc
      source=domain.replace('www.','')  
      for j in range(2,nbrPages+1):
        print(j)
      
      
        page = requests.get('https://fl24.net/page/'+str(j)+'/?s=coronavirus')
        soup = BeautifulSoup(page.content, 'html.parser')

        mydivs = soup.find_all("div", {"class": 'td_module_16 td_module_wrap td-animation-stack'})
        for element in mydivs:
            h3=element.find('h3')
            a=h3.find('a')
            print(a.get('title'))
            
            mylist.append([a.text,source,label])
            allNews.append([a.text,source,label])
      print(len(mylist))
      print('----------FINISHED----------------------')
      return(mylist)
    elif (site=='3'):
      mylist=[]
      domain=urlparse('https://www.francetvinfo.fr/sante/maladie/coronavirus/').netloc
      source=domain.replace('www.','')
      for j in range(320,nbrPages+321):
        print(j)
      
      
        page = requests.get('https://www.francetvinfo.fr/sante/maladie/coronavirus/'+str(j)+'.html')
        soup = BeautifulSoup(page.content, 'html.parser')
        #soup=soup.encode('latin-1')

        mydivs = soup.find_all("p", {"class": 'taxonomy-content__title'})
        for element in mydivs:
            fakeNews=element.text
            fakeNews=fakeNews.replace("\xa0","") 
            
            print(fakeNews)   
            mylist.append([fakeNews,source,label])
            allNews.append([fakeNews,source,label])
      print(len(mylist))
      print('----------FINISHED----------------------')
      return(mylist)



  scrapForMe('https://www.doctissimo.fr/sante/epidemie/coronavirus-chinois/coronavirus-fausses-infos','div','a',"doc-menu-summary",0,'') #23


  scrapForMe('https://hoaxbuster.com/covid19','div','a',"title_article",0,'') #47


  scrapForMe('https://blog.digimind.com/fr/tendances/covid-30-fake-news-les-plus-repandues-sur-medias-sociaux','tr','span',"title_article",0,'') #30
  scrapForMe('https://www.pasteur.fr/fr/journal-recherche/actualites/coronavirus-attention-aux-fausses-informations-covid-19-circulant-reseaux-sociaux','div','h2',"body",0,'') #30
  scrapMultiplePages(11,'1',0)
  scrapForMe('https://www.newsguardtech.com/fr/coronavirus-misinformation-tracking-center/','','a',"col-sm-12 col-md-12 col-lg-12",0,'condition1') #57

  #saveData(scrapForMe('https://unric.org/fr/covid-19-info-ou-intox/','ul','li',"tdb-block-inner td-fix-index",False,'condition2'))

  scrapForMe('https://usbeketrica.com/fr/article/fake-news-10-mythes-les-plus-populaires-sur-covid-19','div','h2',"rich-text",0,'')

  scrapMultiplePages(18,'2',0)

  scrapMultiplePages(20,'3',1)

  
  print(len(allNews))
  return allNews



