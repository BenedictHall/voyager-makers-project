const User = require("../models/user");
const bcrypt = require("bcrypt");

const create = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            try {
                const user = new User({ email, password: hash, username, firstname, lastname });
                await user.save();
                console.log("User created, id:", user._id.toString());
                res.status(201).json({ message: "OK" });
            } catch (error) {
                console.error(error);
                if (error.code === 11000) {
                    if (error.message.includes("username")) {
                        res.status(409).json({ message: "Username already exists"});
                    } else {
                        console.log('hi');
                        res.status(409).json({ message: "Email already exists"});
                    }
                } else {
                    res.status(400).json({ message: "Something went wrong"});
                }
            }
        })
    })
};

const UsersController = {
    create: create,
};

module.exports = UsersController;