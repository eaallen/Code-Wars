import speech_recognition as sr 

# init speach recognizer  
r = sr.Recognizer()

# get the auio file from your current directory 
# it needs to be in .wav format to work. I went to https://audio.online-convert.com/convert-to-wav to accomplish this
audio = sr.AudioFile('test.wav')

#  open the audio file and record its contents 
with audio as src:
   audio_file = r.record(src)

# get the resulting string after runing the speech recognition 
result = r.recognize_google(audio_file)

# exporting the result to a .txt file in the current directory 
with open('recognized.txt',mode ='w') as file: 
   file.write("Recognized Speech:") 
   file.write("\n") 
   file.write(result) 
   print("ready!")