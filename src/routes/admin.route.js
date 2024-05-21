import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { newAdminValidator } from '../validators/admin.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('/register', newAdminValidator, adminController.createAdmin);

router.post('/login', adminController.adminLogin);

export default router;
