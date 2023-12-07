import { Router } from "express";
import {createFolder, getAllFolders, getFolder} from "../controllers/folder.controller";

let router:Router = Router();

router.post('/', createFolder);

router.get('/', getAllFolders);
router.get('/:id', getFolder);


export default router;