import { Router } from "express";
import { getRandomImage } from "../controllers/random.controller";

let router:Router = Router();

router.get('/all', getRandomImage);

export default router;