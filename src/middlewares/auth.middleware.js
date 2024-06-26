import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
const secret_key = process.env.SECRET_KEY;
import {writeToFile,readFromFile} from './file_readwrite.middleware';
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const adminAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { user,email,role } = await jwt.verify(bearerToken, secret_key);
    console.log("rolee-------------->",role);
    res.locals.user = user;
    res.locals.token = bearerToken;
    
    const tokenData = {email,role};
    const filePath = 'file.txt';
    console.log('---------------------->>>>>>>',tokenData);
    await writeToFile(tokenData,filePath);

    // Read data from file
    const fileData = await readFromFile(filePath);
    console.log('File data:', fileData);

    if (role=="admin"){
      next();
    }else{
      throw{
        code: HttpStatus.BAD_REQUEST,
        message: 'Admin Authorization is required'
      }
    }
  } catch (error) {
    next(error);
  }
};