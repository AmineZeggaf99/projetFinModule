import os


os.chdir('C:\\Users\\amine\\Desktop\\projetFinModule\\backend\\ML_Models\\fakeNews')



import pandas as pd
import numpy as np

dSet = pd.read_csv('news.csv', sep = ';')

from LabelEncoderModified import LabelEncoderExt 

labelencoder = LabelEncoderExt ()
labelencoder.fit(dSet.news.values)

dSet['news'] = labelencoder.transform(dSet.news.values)



import pickle
with open('fakeNewsDetector.pkl', 'rb') as f:
    newsModel = pickle.load(f)

def detectFakeNews(news):
    x = [news]
    

    x_encoded=labelencoder.transform(x)

    predicted= newsModel.predict(x_encoded.reshape(1,-1))

    

    return int(predicted)




