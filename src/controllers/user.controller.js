import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try{
    const data = await UserService.userLogin(req.body);
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

