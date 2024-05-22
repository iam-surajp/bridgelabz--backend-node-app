import sequelize, { DataTypes } from '../config/database';
const employee = require('../models/employee')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const secret_key = process.env.secret_key;


export const getAllEmployees =async (body)=>{
    const data = await employee.findAll()
    return data;
}

export const createEmployee = async (body)=>{
    try{
    const data = await employee.create(body);
    return{
        code:200,
        data:data,
        message: "Employee created successfully"
    }
    }catch (error){
       next(error)
    }
}

export const updateEmployee = async (id,body) =>{
    const existingEmployee = await employee.findOne({where:{id:id}});
    if(existingEmployee){
        const data = await employee.update(body);
        return {
            code:200,
            data:data,
            message:"Employee record updated successfully"
        }
    }else{
        return{
            code:400,
            data:`Employee with id ${id} does not exist.`,
            message:'Invalid data.' 
        }
    }
}