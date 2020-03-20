const postsModel = require("../models/post.model");

exports.getAllPosts = (req, res, next) => {
    postsModel
        .getAllPosts(req.userId)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getUserPosts = (req, res, next) => {
    let userId = null;
    if (req.query && req.query.user) userId = req.query.user;
    else userId = req.userId; // current user
    postsModel
        .getPostsByUserId(userId)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.addPost = (req, res, next) => {
    postsModel
        .addPost({
            user: req.userId,
            ...req.body,
            image: req.file.filename
        })
        .then(data => {
            res.status(201).json({
                postId: data._id
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getPostDetails = (req, res, next) => {
    postsModel
        .getPostDetails(req.params.id)
        .then(data => {
            if (!data)
                res.status(404).json({
                    error: "can not find this post"
                });
            else res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
