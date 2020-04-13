const express = require("express");
const postsRouter = require("./posts/posts-routers.js");

const server = express();
const port = 9090;

server.use(express.json());
server.use("/api/posts", postsRouter);

server.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`)               
});