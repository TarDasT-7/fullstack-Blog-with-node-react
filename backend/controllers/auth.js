import User from "../models/user.js";
import shortId from "shortid";
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";


export const read = (req, res) => {
    req.profile.hashedPassword = undefined
    return res.json(req.profile)
}

export const register = (req, res) => {

    User.findOne({ 'email': req.body.email })
        .then((result) => {
            if (result) {
                return res.status(400).json({
                    error: "email address is already registered"
                })
            } else {

                const { name, email, password } = req.body;
                let username = shortId.generate();
                let profile = `${process.env.CLIENT_URL}/profile/${username}`;

                let newUser = new User({ name, email, password, profile, username });

                newUser.save().then(result => {


                    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.cookie('token', token, { expiresIn: '1d' });
                    const { _id, username, name, email, role } = result;

                    return res.status(200).json({
                        token,
                        user: { _id, username, name, email, role },
                        message: "register successfully"
                    })

                    //     user: { name, email, profile, username },
                })
                    .catch(e => {
                        return res.status(400).json({
                            error: e,
                            message: "register Unsuccessfully, please check the server"

                        })
                    })
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error: error,
                message: "actions Unsuccessfully, please check the server"
            })
        });
}

export const login = (req, res) => {

    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {

            if (!user) {
                return res.status(400).json({
                    error: "User with this email does not exists."
                })
            }

            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error: "Email and Password do not match"
                })
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { expiresIn: '1d' });
            const { _id, username, name, email, role } = user;

            return res.json({
                token,
                user: { _id, username, name, email, role }
            })

        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: 'err'
            })
        });

    return;

}

export const signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: 'Sign Out successfully'
    })
};

export const requireLogin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})


export const authMiddleware = (req, res, next) => {

    const userId = req.auth._id;

    User.findById({ _id: userId }).then(user => {
        if (!user) {
            return res.status(400).json({
                error: "User not found!"
            })
        }
        req.profile = user
        next();
    })
}

export const adminMiddleware = (req, res, next) => {

    const userId = req.auth._id;

    User.findById({ _id: userId }).then(user => {
        if (!user) {
            return res.status(400).json({
                error: "User not found!"
            })
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: "Admin resource. access denied !"
            })
        }

        req.profile = user
        next();
    })
}