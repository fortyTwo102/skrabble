// server/index.js

const express = require("express");
const PORT = process.env.PORT || 3000
const cors = require("cors")
const path = require("path");
const app = express();
const http = require('http').Server(app);

let baseURL = "http://localhost:3000/app/"

const corsOptions ={
   origin: '*', 
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}



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
        
        resp = {}
        resp.result = true

        if (!q_resp) {
          resp.result = false
        }

        return resp

    } catch (e) {
        throw e
    } finally {
        await client.close()
    }
}

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, "..", "client", "skrabble-app", "build")));

app.get('/app/', (req, res) => {
  roomPath = req.url
  roomID = Math.random().toString(36).slice(5) + "/"
  console.log("[LOG]: 1. Started here. Generated roomID and now redirecting to " + `${baseURL}` +  `${roomID}`)
  res.redirect(`${baseURL}` +  `${roomID}`)
});


app.get('/app/*/static/*', (req, res) => {
  let pathToRedirect = req.url
  let newStaticPath = "/" + pathToRedirect.split("/").slice(3, ).join("/")
  console.log("[LOG]: 2. Redirecting to " + newStaticPath)
  res.redirect(`${newStaticPath}`)
});

app.get('/app/*', (req, res) => {
  roomPath = req.url
  roomID = roomPath
  console.log("[LOG]: 3. In /app/*. Found roomPath: " + roomPath + " and extracted new roomID:" + roomID)
  res.sendFile(path.join(__dirname, "..", "client", "skrabble-app", "build", "index.html"));
});


app.get("/api", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Content-Type", "application/json")
  res.json({ message: "Hello from server!" });
});

app.get("/api/checkWord", async (req, res) => {
    const query = req.query
    q_word = query["q"]
    db_resp = await check_word(q_word)
    res.json(db_resp)
  });

app.listen(PORT, () => {
  console.log(`[INFO]: Server listening on ${PORT}`);
})