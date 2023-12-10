import { Router } from "express";
import { addTag, getTag, getTags, updateTag } from "../controllers/tag.controller";

let router:Router = Router();

router.post('/', addTag);

router.get('/:id', getTag);
router.get('/', getTags);

router.patch('/:id', updateTag);

export default router;