import express from "express"
import { time } from "../controllers/blog.js";

const router = express.Router();

router.get('/', time)

export default router;