const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model(
    "user",
    mongoose.Schema({
        username: String,
        email: String,
        password: String
    })
);

exports.createNewUser = async data => {
    try {
        let user = await User.findOne({ email: data.email });
        if (user) throw "user is already existed";
        let hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        await new User(data).save();
    } catch (error) {
        throw error;
    }
};

exports.login = async data => {
    try {
        let user = await User.findOne({ email: data.email });
        if (!user) throw "there is no user matches this email";
        let isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        );
        if (!isPasswordCorrect) throw "password is incorrect";
        let token = jwt.sign(
            {
                userId: user._id
            },
            "hello this is my secret secret to make jwt",
            {
                expiresIn: "10h"
            }
        );
        return {
            token,
            expiresIn: new Date(Date.now() + 10 * 60 * 60 * 1000),
            userId: user._id
        };
    } catch (error) {
        throw error;
    }
};
