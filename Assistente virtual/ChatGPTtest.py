import io
import os
import openai
import whisper
import pyttsx3
from google.cloud import speech_v1p1beta1 as speech
from google.oauth2 import service_account

# Set the Google Cloud credentials

google_creds = service_account.Credentials.from_service_account_file(os.path.expanduser("~/keys/google_creds.json"))
creds_path = os.path.expanduser("~/keys/google_creds.json")
if not os.path.isfile(creds_path):
    raise Exception("Arquivo de credenciais do Google não encontrado")
google_creds = service_account.Credentials.from_service_account_file(creds_path)


# Initialize the API key
openai.api_key = "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"

engine = pyttsx3.init()

def transcreverTextoEmFala(nomeArquivo):
    client = speech.SpeechClient(credentials=google_creds)
    with io.open(nomeArquivo, "rb") as audio_file:
        content = audio_file.read()
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="pt-BR",
    )
    response = client.recognize(config=config, audio=audio)
    return response.results[0].alternatives[0].transcript

def gerarResposta(prompt):
    resposta = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=4000,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return resposta["choices"][0]["text"]

def testeEmFala(text):
    engine.say(text)
    engine.runAndWait()

def main():
    while True:
        print("Diga 'oi' para começar a gravar sua pergunta...")
        with speech.Microphone() as source:
            recognizer = speech.Recognizer()
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.record(source, duration=3)
            try:
                transcription = recognizer.recognize_google_cloud(audio, credentials_json=google_creds)
                if transcription.lower() == "oi":
                    # Record audio
                    nomeArquivo = "input.wav"
                    print("Diga sua pergunta...")
                    with speech.Microphone() as source:
                        recognizer = speech.Recognizer()
                        recognizer.adjust_for_ambient_noise(source)
                        audio = recognizer.record(source, duration=5)
                        with open(nomeArquivo, "wb") as f:
                            f.write(audio.get_wav_data())

                    # Transcrever audio para texto
                    texto = transcreverTextoEmFala(nomeArquivo)
                    if texto:
                        print(f"Você disse: {texto}")

                    # Gerar resposta usando GPT-3
                    res = gerarResposta(texto)
                    print(f"GPT diz: {res} ")

                    testeEmFala(res)
            except Exception as e:
                print("Ocorreu um erro:", e)

if __name__ == "__main__":
    main()
