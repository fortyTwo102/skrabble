import json, os
from pprint import pprint 

def process_json(file_path):
    
    sub_dict = dict()
    blob = json.load(open(file_path))

    for obj in blob:
        word = obj["word"]
        
        if word[0] not in sub_dict:
            sub_dict[word[0]] = [word]
        else:
            sub_dict[word[0]].append(word)

    return sub_dict

dictionary_obj = dict()

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".json"):
            sub_dict = process_json(os.path.join(root, file))
            dictionary_obj[file[0]] = sub_dict

json.dump(dictionary_obj, open("dictionary.json", "w"))