import User from "../models/user.js";
    

export const read = (req, res) => {

    req.profile.hashedPassword = undefined
    return res.json(req.profile)

}