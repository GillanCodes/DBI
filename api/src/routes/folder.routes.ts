import { Router } from "express";
import {createFolder} from "../controllers/folder.controller";

let router:Router = Router();

router.post('/', createFolder);

export default router;