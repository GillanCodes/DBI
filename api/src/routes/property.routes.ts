import { Router } from "express";
import { addProperty, deleteProperty } from "../controllers/property.controller";
let router:Router = Router();

router.post('/', addProperty);

router.delete('/:id', deleteProperty);

export default router;