import { Router } from "express";
import { getRandomWithParams, getRandomImage } from "../controllers/random.controller";

let router:Router = Router();

router.get('/all', getRandomImage);
router.get('/', getRandomWithParams);

export default router;