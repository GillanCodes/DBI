import { Router } from "express";
import { addProperty, deleteProperty, getProperties, updateValue } from "../controllers/property.controller";
let router:Router = Router();

router.post('/', addProperty);

router.delete('/:id', deleteProperty);

router.patch('/:pid/:iid', updateValue);

router.get('/', getProperties);

export default router;