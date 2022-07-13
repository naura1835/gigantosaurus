const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const PORT = 3000;
require("dotenv").config();

let db;

const app = express();

app.use(cors());
//the 2 lines below allow us to peek into our request object and get all the stuff we need out of it
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

MongoClient.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  console.log("connected to database");
  db = client.db("gigantosaurus");
});

// const characters = {
//   mazu: {
//     name: "mazu",
//     "type of dinosaur": "ankylosaurus",
//     imageURL:
//       "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/mazu_1.jpg",
//   },
//   rocky: {
//     name: "rocky",
//     "type of dinosaur": " parasaurolophus",
//     imageURL:
//       "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/rocky_2.jpg",
//   },
//   bill: {
//     name: "bill",
//     "type of dinosaur": "brachiosaurus",
//     imageURL:
//       "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/bill_2.jpg",
//   },
//   tiny: {
//     name: "tiny",
//     "type of dinosaur": "triceratops",
//     imageURL:
//       "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/tiny_3.jpg",
//   },
//   giganto: {
//     name: "giganto",
//     "type of dinosaur": "T-rex",
//     imageURL:
//       "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/giganto_3.jpg",
//   },
//   ayati: {
//     name: "ayati",
//     "type of dinosaur": "brachiosaurus",
//     imageURL:
//       "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/ayati_1.jpg",
//   },
// };

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  db.collection("characters")
    .find()
    .toArray()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
  // res.json(characters);
});

app.get("/api/:character", (req, res) => {
  const dinosaur = req.params.character.toLowerCase();
  db.collection("characters")
    .findOne({ name: dinosaur })
    .then((dino) => res.json(dino))
    .catch((err) => console.log(error));
  // if (characters[dinosaur]) res.json(characters[dinosaur]);
  // else res.json(characters["ayati"]);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`your port is running on ${PORT}`);
});
