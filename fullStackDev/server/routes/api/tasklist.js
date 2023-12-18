const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//get Posts
router.get("/", async (req, res) => {
  const tasks = await loadPostsCollection();
  res.send(await tasks.find({}).toArray());
});

//Add Post

router.post("/", async (req, res) => {
  const tasks = await loadPostsCollection();
  await tasks.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Post

router.delete("/:id", async (req, res) => {
  const tasks = await loadPostsCollection();
  await tasks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://Kimtong:1234@cluster0.vtc1i.mongodb.net/test",
    { serNewUrlParser: true }
  );
  return client.db("my_tasklist").collection("task");
}

module.exports = router;
