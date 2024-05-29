import express from 'express';
import * as employeeController from '../controllers/employee.controller';
import { adminAuth } from '../middlewares/auth.middleware';
const router  = express.Router();

router.post('/',adminAuth,employeeController.createEmployee);

router.get('/',adminAuth,employeeController.getAllEmployees);

// router.get('/:id',getAEmployee);

router.put('/:id',adminAuth,employeeController.updateEmployee);

router.delete('/:id',adminAuth,employeeController.deleteEmployee);

export default router;