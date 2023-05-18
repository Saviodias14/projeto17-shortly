import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signinSchema, signupSchema } from "../schemas/sign.schema.js";
import { signin, signup } from "../controllers/sign.controller.js";
import { validatePassword } from "../middlewares/login.middleware.js";

const signRouter = Router()

signRouter.post("/signup", validateSchema(signupSchema), signup)
signRouter.post("/signin", validateSchema(signinSchema),validatePassword, signin)

export default signRouter