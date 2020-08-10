from os import path
from pydub import AudioSegment
def convert(mp3_path, wav_path):
    # convert mp3 to wav                                                            
    sound = AudioSegment.from_mp3(mp3_path)
    sound.export(wav_path, format="wav")
    return wav_path+".wav"

convert('test.mp3', 'yeet')