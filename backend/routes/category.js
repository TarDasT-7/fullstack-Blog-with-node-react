import express from "express"
import { store } from "../controllers/category.js";

import { runValidation } from "../validators/index.js";
import { categoryCreateValidator } from "../validators/category.js";
import { adminMiddleware, requireLogin } from "../controllers/auth.js";


const router = express.Router();


router.post('/category',categoryCreateValidator, runValidation, requireLogin, adminMiddleware, store);


export default router;