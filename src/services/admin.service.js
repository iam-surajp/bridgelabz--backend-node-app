import sequelize, { DataTypes } from '../config/database';
const admin = require('../models/admin')(sequelize, DataTypes);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = process.env.secret_key;


//create new user
export const createAdmin = async (body) => {
  const email = body.email;
  const checkForUser = await admin.findOne({where: {email: email}});

  if(checkForUser === null){
    body.password = await bcrypt.hash(body.password, 10);
    const data = await admin.create(body);
    return {
      code: 201,
      data: data,
      message: 'Admin registered successfully'
    };
  }
  else {
    return {
      code: 400,
      data: `Admin with ${email} already exist`,
      message: 'Invalid Credential'
    };
  }
};

export const adminLogin = async (body) => {
  const existingAdmin = await admin.findOne({where:{email:body.email}});
  if(existingAdmin == null){
    return {
      code: 400,
      data: `User with ${body.email} is not registered as admin`,
      message: 'invalid credentials'
    }
  }else{
    const checkPassword = await bcrypt.compare(body.password, existingAdmin.dataValues.password);
    if(checkPassword){
      const token = jwt.sign({email:existingAdmin.email,role:existingAdmin.role},secret_key);
      return {
        code: 202,
        data: token,
        message: `Admin with ${body.email} is login successfully`,
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

