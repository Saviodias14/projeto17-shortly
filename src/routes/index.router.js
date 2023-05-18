import { Router } from "express";
import signRouter from "./sign.router.js";
import urlsRouter from "./urls.router.js";

const router = Router()

router.use(signRouter)
router.use(urlsRouter)

export default router