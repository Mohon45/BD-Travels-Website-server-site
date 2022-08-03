const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m0coh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("our_service");
    const serviceCollection = database.collection("services");

    // GET Services API
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // Add Services
    app.post("/addServices", async (req, res) => {
      const addService = req.body;
      const result = await serviceCollection.insertOne(addService);
      res.json(result);
    });

    // get single product
    app.get("/singleProduct/:id", async (req, res) => {
      const result = await servicesCollection
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      res.send(result[0]);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Traveling-Sarver Running");
});

app.listen(port, () => {
  console.log("Traveling-Sarver Running", port);
});
