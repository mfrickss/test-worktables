import { Router } from "express";
import { weatherController } from "../controllers/weatherController";

export const router = Router();

router.get("/:country", weatherController);
