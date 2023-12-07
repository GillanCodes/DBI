//Imports
import { Router } from 'express';
import { signin, signout, signup } from '../controllers/auth.controller';
let router:Router = Router();

//Routes definitions
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signout', signout);

//default export
export default router;