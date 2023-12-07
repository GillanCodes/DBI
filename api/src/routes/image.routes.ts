import { Router } from "express";
import { createImages } from "../controllers/image.controller";

import multer = require('multer');
const upload = multer();

let router:Router = Router();

router.post('/', upload.array("files"), createImages);

export default router;