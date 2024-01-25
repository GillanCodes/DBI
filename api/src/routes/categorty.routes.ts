import { Router } from "express";
let router:Router = Router();

import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.controller";

router.post('/', addCategory);

router.get('/', getCategories);
router.get('/:id', getCategory);

router.patch('/:id', updateCategory);

router.delete('/:id', deleteCategory);

export default router;