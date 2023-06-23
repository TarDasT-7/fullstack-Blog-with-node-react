import express from "express"
<<<<<<< HEAD
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

=======
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


>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
export default router;