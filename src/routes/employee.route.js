import express from 'express';
import * as employeeController from '../controllers/employee.controller';
const router  = express.Router();

router.post('/',employeeController.createEmployee);

router.get('/',employeeController.getAllEmployees);

// router.get('/:id',getAEmployee);

router.put('/:id',employeeController.updateEmployee);

// router.delete('/:id',deleteEmployee);

export default router;