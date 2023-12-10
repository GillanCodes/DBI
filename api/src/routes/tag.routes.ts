import { Router } from "express";
import { addTag, getTag, getTags } from "../controllers/tag.controller";

let router:Router = Router();

router.post('/', addTag);

router.get('/:id', getTag);
router.get('/', getTags);

export default router;