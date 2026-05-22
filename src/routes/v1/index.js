import express from 'express';
const router=express.Router();
import {createUserAccount} from '../../controllers/user-controllers.js'
router.post('/user',createUserAccount);
export default router