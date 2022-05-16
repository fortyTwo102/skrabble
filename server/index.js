// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

async function check_word(q_word) {

    var MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/";
    const client = new MongoClient(url)

    try {
        // connect
        await client.connect()
        // DB call
        // let resp = await DBCALL_find_word(client, q_word)
        // return resp
        
        const db_obj = await client.db(q_word.length.toString())
        const query = {
            _id: q_word
        }
        const collection_obj = await db_obj.collection(q_word[0])
        q_resp = await collection_obj.findOne(query)

        return q_resp

    } catch (e) {
        throw e
    } finally {
        await client.close()
    }
}

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/checkWord", async (req, res) => {
    const query = req.query
    q_word = query["q"]
    db_resp = await check_word(q_word)
    res.json(db_resp)
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})