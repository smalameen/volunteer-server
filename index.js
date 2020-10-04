const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const port = 3002


const app = express()

app.use(cors());
app.use(bodyParser.json())

const password = 'hiHelloNillShari'


var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://volunteer:hiHelloNillShari@cluster0-shard-00-00.xdmuv.mongodb.net:27017,cluster0-shard-00-01.xdmuv.mongodb.net:27017,cluster0-shard-00-02.xdmuv.mongodb.net:27017/volunteer?ssl=true&replicaSet=atlas-g1fjff-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  const organization= client.db("volunteer").collection("organization");
  console.log("connected")
  
  app.post('/addOrgInfo', (req, res)=>{
    const newOrg = req.body;
    organization.insertOne(newOrg)
    .then(result => {
      
      console.log(result);
      res.send(result.insertedCount > 0);
    })
    console.log(newOrg);
  })

  app.get('/organizations', (req, res)=>{
    console.log(req.query.email)
    organization.find({email: req.query.email})
    .toArray((err, results) => {
      res.send(results);
    })
  })
  
});


app.get('/', (req, res) => {
  req.send('Hello World!')
})

app.listen(port)