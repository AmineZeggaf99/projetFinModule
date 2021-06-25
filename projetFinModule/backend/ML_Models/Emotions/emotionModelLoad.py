from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
from transformers import pipeline


def emotionDetector(emotions):
    tokenizer = AutoTokenizer.from_pretrained("tblard/tf-allocine")
    model = TFAutoModelForSequenceClassification.from_pretrained("aminezeggaf/EmotionAnalysisAmine")

    nlp = pipeline('text-classification', model=model, tokenizer=tokenizer)


    return nlp(emotions)


