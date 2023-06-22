# para instalar todos os modulos
# pip install -r requirements.txt
import openai  # pip install openai
import speech_recognition as sr  # pip install SpeechRecognition
import pyttsx3  # pip install pyttsx3
import time

# Initialize the API key
openai.api_key = "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"

engine = pyttsx3.init()
voices = engine.getProperty('voices')

for voice in voices:
    if "male" in voice.name.lower():
        engine.setProperty('voice', voice.id)
        break

def transcreverTextoEmFala(nomeArquivo):
    recognizer = sr.Recognizer()
    with sr.AudioFile(nomeArquivo) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio,  language='pt-BR')
    except:
        print('Erro no reconhecimento de voz')

def gerarResposta(prompt):
    resposta = openai.Completion.create(
        engine = "text-davinci-001",
        prompt=prompt,
        max_tokens=1000,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return  resposta["choices"][0]["text"]

def testeEmFala(text):
    engine.say(text)
    engine.runAndWait()

def main():
    while True:
        print("Say 'alexa' to start recordingg your question...")
        with sr.Microphone() as source:
            recognizer = sr.Recognizer()
            audio = recognizer.listen(source)
            try:
                transcription = recognizer.recognize_google(audio, language='pt-BR')
                if  transcription.lower() == "alexa":
                    #Record audio
                    nomeArquivo = "input.wav"
                    print("say your question...")
                    with  sr.Microphone() as  source:
                        recognizer = sr.Recognizer()
                        source.pause_threshold = 1
                        audio = recognizer.listen(source, phrase_time_limit=None,  timeout=None)
                        with open(nomeArquivo, "wb") as f:
                            f.write(audio.get_wav_data())

                    #transcrever audio para texto
                    texto = transcreverTextoEmFala(nomeArquivo)
                    if texto:
                        print(f"Você disse: {texto}")

                    #Gerar resposta usando GPT-3
                    res = gerarResposta(texto)
                    print(f"GPT diz: {res} ")

                    testeEmFala(res)
            except Exception as e:
                print("An error occured: {}".format(e))

if __name__ == "__main__":
    main()