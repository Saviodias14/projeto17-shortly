import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js"
import { getInfoUser } from "../controllers/list.controller.js";

const listRouter = Router()

listRouter.get("/users/me", authValidation, getInfoUser)
listRouter.get("/ranking")

export default listRouter