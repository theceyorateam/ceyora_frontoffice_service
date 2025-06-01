import express from "express";
import {createUser, getUser} from '../controllers/customer_controller';

const router = express.Router();

router.post('', createUser);
router.get('', getUser);

export default router;
