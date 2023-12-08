import { Router } from "express";
import { createImages, getImage } from "../controllers/image.controller";

import multer = require('multer');
const upload = multer();

let router:Router = Router();

router.post('/', upload.array("files"), createImages);

router.get('/:id', getImage);

export default router;