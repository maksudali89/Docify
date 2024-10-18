import express from 'express';
 const router = express.Router();
import {handlerForUserSignup,handlerForUserLogin,HandlerForGetUsers} from '../controllers/users.js';
import { HandlerForCreateNewDocument } from '../controllers/document.js';

router.post('/signup',handlerForUserSignup);
router.post('/login',handlerForUserLogin);
router.get('/getUser',HandlerForGetUsers)

export default router;


