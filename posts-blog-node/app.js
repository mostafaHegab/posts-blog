const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "images")));

const isAuth = require("./guards/auth.guard").isAuth;

const CORS = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Content-Type"
    );
    next();
}

app.use(CORS);

// get all posts
app.get(
    "/api",
    isAuth,
    require("./controllers/posts.controller").getAllPosts
);

app.use("/api/auth", require("./routes/auth.route"));

app.use("/api/posts",
    isAuth,
    require("./routes/posts.route"));

require("mongoose")
    .connect(
        "mongodb://localhost:27017/posts-blog"
    )
    .then(() => {
        console.log("connected to db");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log("server is listen on port: " + PORT);
        });
    })
    .catch(err => console.log(err));
