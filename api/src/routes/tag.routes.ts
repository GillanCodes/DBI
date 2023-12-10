import { Router } from "express";
import { addTag, getTag } from "../controllers/tag.controller";

let router:Router = Router();

router.post('/', addTag);

router.get('/:id', getTag);

export default router;