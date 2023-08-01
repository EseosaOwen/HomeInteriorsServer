const mongoose = require("mongoose");
const express = require("express");
const app = express();
const techBlogRoutes = require("./routes/techBlog");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-tech")
  .then(() => console.log("Connected to MongoDB Successfully..."))
  .catch((err) => console.log(`Error: ${err}`));

const port = process.env.port;
app.listen(port || 5000, () => console.log(`Listening on port ${port ? port : 5000}`));
