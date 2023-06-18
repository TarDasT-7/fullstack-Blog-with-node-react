import express from "express"
import { register, login, signOut, requireLogin } from "../controllers/auth.js";

// validator

import { runValidation } from "../validators/index.js";
import { registerValidator, loginValidator } from "../validators/auth.js";


const router = express.Router();

router.post('/register', registerValidator, runValidation,  register);
router.post('/login', loginValidator, runValidation,  login);
router.get('/signout', signOut);

//  test
router.get('/secret',requireLogin ,(req, res)=>{
    res.json({
        message: "you have access to secret page"
    })
})


export default router;