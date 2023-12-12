import { Router } from "express";
import { createImages, deleteImage, getImage, getImages, getImagesWithParams, updateImage } from "../controllers/image.controller";

import multer = require('multer');
const upload = multer();

let router:Router = Router();

router.post('/', upload.array("files"), createImages);

router.get('/', getImages);
router.get('/params', getImagesWithParams);
router.get('/:id', getImage);

router.patch('/:id', updateImage);

router.delete('/:id', deleteImage);

export default router;