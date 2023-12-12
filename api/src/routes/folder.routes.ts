import { Router } from "express";
import {createFolder, editFolder, getAllFolders, getFolder} from "../controllers/folder.controller";

let router:Router = Router();

router.post('/', createFolder);

router.get('/', getAllFolders);
router.get('/:id', getFolder);

router.patch('/:id', editFolder);

export default router;