import { Router } from "express";
import {createFolder, editFolder, editFolderIcon, getAllFolders, getFolder} from "../controllers/folder.controller";

import multer = require("multer");
const upload = multer();

let router:Router = Router();

router.post('/', createFolder);

router.get('/', getAllFolders);
router.get('/:id', getFolder);

router.patch('/icon/:id', upload.single('file') ,editFolderIcon);
router.patch('/:id', editFolder);

export default router;