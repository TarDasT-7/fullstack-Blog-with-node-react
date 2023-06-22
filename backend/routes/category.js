import express from "express"
import { index, show, store, update, destroy } from "../controllers/category.js";

import { runValidation } from "../validators/index.js";
import { categoryCreateValidator } from "../validators/category.js";
import { adminMiddleware, requireLogin } from "../controllers/auth.js";


const router = express.Router();


router.get('/category', index);
router.post('/category', categoryCreateValidator, runValidation, requireLogin, adminMiddleware, store);
router.get('/category/:slug', show);
router.patch('/category/:id', categoryCreateValidator, runValidation, requireLogin, adminMiddleware, update);
router.delete('/category/:slug', runValidation, requireLogin, adminMiddleware, destroy);


export default router;