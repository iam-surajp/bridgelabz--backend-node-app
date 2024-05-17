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

  if(checkForUser === null ){
    const data = await User.create(body);
    return {
      code: 201,
      data: data,
      message: 'User created successfully'
    }
  }
  else{
    return {
      code: 400,
      data: `User with ${email} already exist`,
      message: 'Invalid Credential'
    };
  }
};

//update single user
export const updateUser = async (id, body) => {
  await User.update(body, {
    where: { id: id }
  });
  return body;
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
