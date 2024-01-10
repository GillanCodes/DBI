import { Router } from "express";
import { createMedias, deleteMedia, getMedia, getMedias, getMediasFromFolder, getMediasWithParams, likeMedia, updateMedia } from "../controllers/media.controller";

import multer = require('multer');
const upload = multer();

let router:Router = Router();

router.post('/', upload.array("files"), createMedias);

router.get('/', getMedias);
router.get('/params', getMediasWithParams);
router.get('/folder/:folderId', getMediasFromFolder);
router.get('/:id', getMedia);


router.patch('/:id', updateMedia);
router.patch('/like/:id', likeMedia);

router.delete('/:id', deleteMedia);

export default router;