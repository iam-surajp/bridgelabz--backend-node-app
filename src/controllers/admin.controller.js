import HttpStatus from 'http-status-codes';
import * as adminService from '../services/admin.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createAdmin = async (req, res, next) => {
  try {
    const data = await adminService.createAdmin(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try{
    const data = await adminService.adminLogin(req.body);
    res.status(data.code).json({
      code: data.code,
      id:data._id,
      data: data.data,
      message: data.message,
      token:data.token
    })
  }catch(error){
    next(error);
  }
}

