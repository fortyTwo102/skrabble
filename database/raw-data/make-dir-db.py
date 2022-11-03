import json, os

def process_json(file_path):
    
    words = list()
    blob = json.load(open(file_path))

    for obj in blob:
        words.append(obj["word"])

    return words

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".json"):
            words = process_json(os.path.join(root, file))
            print(words)
            for word in words:
                os.makedirs(os.path.join(root, word[0]), exist_ok=True)
                open(os.path.join(root, word[0], word), "w")

        print(file + " is done")