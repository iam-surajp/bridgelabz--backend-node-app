import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
const bcrypt = require('bcrypt');




//create new user
export const newUser = async (body) => {
  const email = body.email;
  const checkForUser = await User.findOne({where: {email: email}});

  if(checkForUser === null){
    body.password = await bcrypt.hash(body.password, 10);
    const data = await User.create(body);
    return {
      code: 201,
      data: data,
      message: 'User created successfully'
    };
  }
  else {
    return {
      code: 400,
      data: `User with ${email} already exist`,
      message: 'Invalid Credential'
    };
  }
};

export const userLogin = async (body) => {
  const checkUser = await User.findOne({where:{email:body.email}});
  if(checkUser == null){
    return {
      code: 400,
      data: `User with ${body.email} is not registered`,
      message: 'invalid credentials'
    }
  }else{
    checkUser.dataValues.password
    const checkPassword = await bcrypt.compare(body.password, checkUser.dataValues.password);
    if(checkPassword){
      return {
        code: 202,
        data: `User with ${body.email} is login successfully`,
        message: `User with ${body.email} is login successfully`
      }
    }else{
      return {
        code: 400,
      data: `Please Enter valid password`,
      message: 'invalid credentials'
      }
    }
  }
}

