import { Router } from "express";
import { getRandomWithParams, getRandomMedia } from "../controllers/random.controller";

let router:Router = Router();

router.get('/all', getRandomMedia);
router.get('/', getRandomWithParams);

export default router;