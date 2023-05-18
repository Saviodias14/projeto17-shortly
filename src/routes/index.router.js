import { Router } from "express";
import signRouter from "./sign.router.js";
import urlsRouter from "./urls.router.js";
import listRouter from "./lists.router.js";

const router = Router()

router.use(signRouter)
router.use(urlsRouter)
router.use(listRouter)

export default router