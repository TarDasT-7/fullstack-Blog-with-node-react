import express from "express"
import { index, store, show, update, destroy, listAllBlogCategoryTag } from "../controllers/blog.js";
import { blogCreateValidator } from "../validators/blog.js";
import { runValidation } from "../validators/index.js";
import { adminMiddleware, requireLogin } from "../controllers/auth.js";

const router = express.Router();

router.get('/blog', index);
router.post('/blog', runValidation, requireLogin, adminMiddleware, store);
router.get('/blog/:slug', show);
router.patch('/blog/:slug', runValidation, requireLogin, adminMiddleware, update);
router.delete('/blog/:slug', runValidation, requireLogin, adminMiddleware, destroy);

router.post('/blog-category-tag', listAllBlogCategoryTag);


export default router;