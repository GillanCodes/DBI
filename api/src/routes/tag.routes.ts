import { Router } from "express";
import { addTag } from "../controllers/tag.controller";

let router = Router();

router.post('/', addTag);

export default router;