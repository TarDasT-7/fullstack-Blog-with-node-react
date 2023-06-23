import express from "express"
import { index, show, store, update, destroy } from "../controllers/tag.js";

import { runValidation } from "../validators/index.js";
import { tagCreateValidator } from "../validators/tag.js";
import { adminMiddleware, requireLogin } from "../controllers/auth.js";


const router = express.Router();


router.get('/tag', index);
router.post('/tag', tagCreateValidator, runValidation, requireLogin, adminMiddleware, store);
router.get('/tag/:slug', show);
router.patch('/tag/:id', tagCreateValidator, runValidation, requireLogin, adminMiddleware, update);
router.delete('/tag/:slug', runValidation, requireLogin, adminMiddleware, destroy);


export default router;