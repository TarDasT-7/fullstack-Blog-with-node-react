import express from "express"
const router = express.Router();

import { runValidation } from "../validators/index.js";
import { tagCreateValidation } from "../validators/tag.js";

import { adminMiddleware, requireLogin } from "../controllers/auth.js";
import { index, store, show, update, destroy } from "../controllers/tag.js";


router.get('/tag', index);
router.post('/tag', tagCreateValidation, runValidation, requireLogin, adminMiddleware, store);
router.get('/tag/:slug', show);
router.patch('/tag/:slug', tagCreateValidation, runValidation, requireLogin, adminMiddleware, update);
router.delete('/tag/:slug', runValidation, requireLogin, adminMiddleware, destroy);

export default router;