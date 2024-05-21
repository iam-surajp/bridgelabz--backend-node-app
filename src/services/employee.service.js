import sequelize, { DataTypes } from '../config/database';
const employee = require('../models/employee')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const secret_key = process.env.secret_key;


const getAllEmployees =async (body)=>{
    data = await employee.findAll()
    return data;
}

// const createNewEmployee = async (body)=>{
//     try{
//     data = await employee.create(body)
//     }catch{

//     }
// }