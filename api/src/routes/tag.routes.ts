import { Router } from "express";
import { addTag, deleteTag, getTag, getTags, updateTag } from "../controllers/tag.controller";

let router:Router = Router();

router.post('/', addTag);

router.get('/:id', getTag);
router.get('/', getTags);

router.patch('/:id', updateTag);

router.delete('/:id', deleteTag);

export default router;