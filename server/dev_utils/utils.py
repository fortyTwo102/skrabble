import json
from pymongo import MongoClient
import os

def get_mongodb(db_name):

    cwd = os.path.dirname(__file__)
    config = json.load(open(os.path.join(cwd, "config.json")))
    MONGODB_CONN_STRING = config["MONGODB_CONN_STRING"]
    client = MongoClient(MONGODB_CONN_STRING)

    return client[db_name]

