const mongoose = require("mongoose");

const Post = mongoose.model(
    "post",
    mongoose.Schema({
        title: String,
        content: String,
        image: String,
        timestamp: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    })
);

exports.getAllPosts = async id => {
    return await Post.find(
        {
            user: { $ne: id }
        },
        null,
        { sort: { timestamp: -1 } }
    );
};

exports.getPostsByUserId = async id => {
    return await Post.find({ user: id }, null, { sort: { timestamp: -1 } });
};

exports.addPost = async data => {
    data.timestamp = Date.now();
    let post = new Post(data);
    return await post.save();
};

exports.getPostDetails = async id => {
    return await Post.findById(id).populate("user");
};
