import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);


//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  const email = body.email;
  const checkForUser = await User.findOne({where: {email: email}});

  if(checkForUser === null){
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

//update single user
export const updateUser = async (id, body) => {
  const checkForId = await User.findOne({ where: { id: id } });
  // console.log('checkforid is :', checkForId);
  if (checkForId !== null) {
    const email = body.email;
    const existing_email = await User.findOne({ where: { email: email } });
    if (!existing_email){ 
        await User.update(body, {
          where: { id: id }
        });
        return {
          code: 201,
          data: await User.findOne({where:{id:id}}),
          message: 'User updated successfully'
        };
    } else {
          return{
            code:400,
            data: `User with email ${email} already exist.`,
            message: 'User update error'
            }
    }
  } else {
    return {
      code: 400,
      data: `User not found for given Id ${id}`,
      message: 'User Update error'
    };
  }
};


//delete single user
export const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findByPk(id);
  return data;
};
