import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js"
import { getInfoUser, getRanking } from "../controllers/list.controller.js";

const listRouter = Router()

listRouter.get("/users/me", authValidation, getInfoUser)
listRouter.get("/ranking", getRanking)

export default listRouter