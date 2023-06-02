from gtts import gTTS
import os
# import json
import json


# Wczytaj dane z pliku
with open('phrasalverbs.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Posortuj klucze danych
sorted_keys = sorted(data.keys())

# Utwórz posortowany słownik
sorted_data = {key: data[key] for key in sorted_keys}

# Zapisz posortowane dane do pliku
# with open('sorted_data.json', 'w', encoding='utf-8') as file:
#     json.dump(sorted_data, file, ensure_ascii=False, indent=4)

print("Dane zostały posortowane i zapisane do pliku sorted_data.json")


# f = open('Phrasal Verbsss.txt', encoding='utf8')
# zawartosc = f.read()
# f.close()
#
# zawartosc.replace('\n', 'xd')
# zawartosc = zawartosc.replace('\n', '*')
#
#
# verb = []
# meaning = []
# example = []
# dictionary = {}
#
# zawartosc = zawartosc.split('*')
# print(zawartosc)
# for i in zawartosc:
#     i = i.split('\t')
#     print(i)
#     verb.append(i[0])
#     meaning.append(i[1])
#     example.append(i[2])
#     # print(list(i))
#
# print(verb[33], meaning[33], example[33])
# # moj_slownik['klucz2'] = 'wartosc2'
# for i in range(len(verb)):
#     dictionary[verb[i]] = [meaning[i], example[i]]
#
# print(dictionary)
# dictionary = json.dumps(dictionary)
#
# with open("sample.json", "w", encoding='utf8') as outfile:
#     outfile.write(dictionary)
#
# ### czytanie znaczenia po ang //
# # mytext = example[1]
# # audio = gTTS(text=mytext, lang="en", slow=False)
# # audio.save('voice/example1.mp3')
# # os.system("start voice/example.mp3")
# # //
# #
# # for i in range(len(zawartosc)):
# #     mytext = example[i]
# #     audio = gTTS(text=mytext, lang="en", slow=False)
# #     audio.save(f'voice/example{i}.mp3')
# def speak():
#     os.system("start voice/example1.mp3")
