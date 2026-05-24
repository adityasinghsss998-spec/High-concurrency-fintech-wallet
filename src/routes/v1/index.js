import express from 'express';
const router=express.Router();
import {createUserAccount,loginUser} from '../../controllers/user-controllers.js'
import {transfer,history} from '../../controllers/transaction-controller.js'
import { authenticate } from '../../middlewares/authenticate.js';
import { transferLimiter } from '../../middlewares/rate-limit.js';
router.post('/user',createUserAccount);
router.post('/transfer',authenticate,transferLimiter,transfer);
router.post('/login', loginUser);
router.get('/transactions',authenticate,history);
export default router