const express = require("express");
const PORT = 3000;

const app = express();

const characters = {
  mazu: {
    name: "mazu",
    "type of dinosaur": "ankylosaurus",
    imageURL:
      "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/mazu_1.jpg",
  },
  rocky: {
    name: "rocky",
    "type of dinosaur": " parasaurolophus",
    imageURL:
      "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/rocky_2.jpg",
  },
  bill: {
    name: "bill",
    "type of dinosaur": "brachiosaurus",
    imageURL:
      "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/bill_2.jpg",
  },
  tiny: {
    name: "tiny",
    "type of dinosaur": "triceratops",
    imageURL:
      "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/tiny_3.jpg",
  },
  giganto: {
    name: "giganto",
    "type of dinosaur": "T-rex",
    imageURL:
      "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/giganto_3.jpg",
  },
  ayati: {
    name: "ayati",
    "type of dinosaur": "brachiosaurus",
    imageURL:
      "https://gigantosaurus-tvseries.com/wp-content/uploads/2019/01/ayati_1.jpg",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:character", (req, res) => {
  const dinosaur = req.params.character.toLowerCase();
  if (characters[dinosaur]) res.json(characters[dinosaur]);
  else res.json(characters["ayati"]);
});

app.listen(PORT, () => {
  console.log(`your port is running on ${PORT}`);
});
