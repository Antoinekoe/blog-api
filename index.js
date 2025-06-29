import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory array to store blog posts
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Get a single post by id
app.get("/posts/:id", (req, res) => {
  let postIndex = parseInt(req.params.id);
  let foundPost = posts.find((post) => postIndex === post.id);
  res.json(foundPost);
});

// Create a new post
app.post("/posts", (req, res) => {
  let postTitle = req.body.title;
  let postContent = req.body.content;
  let postAuthor = req.body.author;
  let postDate = new Date();
  let newPost = {
    id: posts.length + 1,
    title: postTitle,
    content: postContent,
    author: postAuthor,
    date: postDate,
  };
  posts.push(newPost);
  res.json(posts);
});

// Update an existing post by id
app.patch("/posts/:id", (req, res) => {
  let postIndex = parseInt(req.params.id);
  let foundPost = posts.find((post) => postIndex === post.id);

  const replacementPost = {
    id: postIndex,
    title: req.body.title || foundPost.title,
    content: req.body.content || foundPost.content,
    author: req.body.author || foundPost.author,
    date: req.body.date || foundPost.date,
  };
  const searchIndex = posts.findIndex((post) => post.id === postIndex);
  posts[searchIndex] = replacementPost;

  res.json(posts);
});

// Delete a post by id
app.delete("/posts/:id", (req, res) => {
  let postIndex = parseInt(req.params.id);
  const searchIndex = posts.find((post) => post.id === postIndex);
  posts.splice(searchIndex, 1);
  res.json(posts);
});

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
