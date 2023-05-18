import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { deleteUrl, getShortUrl, getUrl, shortUrl } from "../controllers/urls.controller.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), shortUrl)
urlsRouter.get("/urls/:id",getUrl)
urlsRouter.get("/urls/open/:shortUrl", getShortUrl)
urlsRouter.delete("/urls/:id",authValidation, deleteUrl)

export default urlsRouter