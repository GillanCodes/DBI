import { Router } from "express";
import { addProperty } from "../controllers/property.controller";
let router:Router = Router();

router.post('/', addProperty);

export default router;