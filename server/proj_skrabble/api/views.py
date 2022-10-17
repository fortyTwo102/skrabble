from django.shortcuts import render
import sys, os, json
from django.http import HttpResponse

# import util scripts
sys.path.append(os.path.join(os.path.dirname(sys.path[0]), "dev_utils"))
import utils

# Create your views here.
def word(request):

    result = {
        "result": False
    }
    query = request.GET.get("q")
    db = utils.get_mongodb(str(len(query)))
    collection = db[query[0]]

    cursor = collection.find()

    for obj in cursor:
        if query == obj["_id"]:
            result["result"] = True
    json_result = json.dumps(result, indent=4)
    
    return HttpResponse(json_result, content_type='application/json')
