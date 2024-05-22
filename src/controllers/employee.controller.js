import HttpStatus from 'http-status-codes';
import * as employeeService from '../services/employee.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createEmployee = async (req, res, next) => {
  try {
    const data = await employeeService.createEmployee(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (req,res,next) => {
    try {
        const result = await employeeService.getAllEmployees();
        res.status(result.code).json({
            code: result.code,
            data: result.data,
            message: result.message
          });
        
    } catch (error) {
        next(error);
    }
}

export const updateEmployee = async (req,res,next) =>{
  try {
    const data = await employeeService.updateEmployee(req.params,req.body);
    res.status(data.code).json({
      code:data.code,
      data:data.data,
      message:data.message
    })
  } catch (error) {
    next(error);
  }
}

export const deleteEmployee = async (req,res,next) =>{
  try {
    const data = await employeeService.deleteEmployee(req.params);
    res.status(data.code).json({
      code:data.code,
      data:data.data,
      message:data.message
    })
  } catch (error) {
    next(error)
  }
}