import express from "express"
import { requireLogin, authMiddleware, adminMiddleware } from "../controllers/auth.js";
import { read } from "../controllers/user.js";


const router = express.Router();


router.get('/profile', requireLogin, authMiddleware, read);


export default router;