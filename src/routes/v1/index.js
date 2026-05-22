import express from 'express';
const router=express.Router();
import {createUserAccount} from '../../controllers/user-controllers.js'
import {transfer} from '../../controllers/transaction-controller.js'
router.post('/user',createUserAccount);
router.post('/transfer',transfer);
export default router