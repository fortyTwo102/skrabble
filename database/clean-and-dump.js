// reading raw JSON

let one_letter_words = require("./raw-data/1.json")
let two_letter_words = require("./raw-data/2.json")
let three_letter_words = require("./raw-data/3.json")
let four_letter_words = require("./raw-data/4.json")
let five_letter_words = require("./raw-data/5.json")
let six_letter_words = require("./raw-data/6.json")

one_letter_word_dict = {}
two_letter_word_dict = {}
three_letter_word_dict = {}
four_letter_word_dict = {}
five_letter_word_dict = {}
six_letter_word_dict = {}

master_dictionary = {}

temp = {}
one_letter_words.forEach(element => {
    if (temp[element["word"][0]]){
        temp[element["word"][0]].push(element["word"])
    }else{
        temp[element["word"][0]] = [element["word"][0]]
    }
})

master_dictionary["1"] = temp

temp = {}
two_letter_words.forEach(element => {
    if (temp[element["word"][0]]){
        temp[element["word"][0]].push(element["word"])
    }else{
        temp[element["word"][0]] = [element["word"]]
    }
})

master_dictionary["2"] = temp

temp = {}
three_letter_words.forEach(element => {
    if (temp[element["word"][0]]){
        temp[element["word"][0]].push(element["word"])
    }else{
        temp[element["word"][0]] = [element["word"]]
    }
})

master_dictionary["3"] = temp

temp = {}
four_letter_words.forEach(element => {
    if (temp[element["word"][0]]){
        temp[element["word"][0]].push(element["word"])
    }else{
        temp[element["word"][0]] = [element["word"]]
    }
})

master_dictionary["4"] = temp

temp = {}
five_letter_words.forEach(element => {
    if (temp[element["word"][0]]){
        temp[element["word"][0]].push(element["word"])
    }else{
        temp[element["word"][0]] = [element["word"]]
    }
})

master_dictionary["5"] = temp

temp = {}
six_letter_words.forEach(element => {
    if (temp[element["word"][0]]){
        temp[element["word"][0]].push(element["word"])
    }else{
        temp[element["word"][0]] = [element["word"]]
    }
})

master_dictionary["6"] = temp

// dumping 

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

dbs = ["1", "2", "3", "4", "5", "6"] // one database for every word size
collections = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // one collection for every first letter 

// creating the schema, run only once

// Object.keys(master_dictionary).forEach(db_name => {
//     MongoClient.connect(url + "/" + db_name, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(db_name);
//         Object.keys(master_dictionary[db_name]).forEach(collection_name => {
//             dbo.createCollection(collection_name, function(err, res) {
//                 if (err) throw err;
//                 console.log("Collection created!", db_name, collection_name);
//             });
//         })
//     });
// })


// dumping the data

Object.keys(master_dictionary).forEach(db_name => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        Object.keys(master_dictionary[db_name]).forEach(collection_name => {
            master_dictionary[db_name][collection_name].forEach(word => {
                insertObj = {
                    "_id": word
                }
                dbo.collection(collection_name).insertOne(insertObj, function(err, res) {
                if (err) throw err;
                console.log("Document inserted: " + word);
            })
          });
        })
    });
})
