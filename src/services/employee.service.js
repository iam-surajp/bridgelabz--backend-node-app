import sequelize, { DataTypes } from '../config/database';
const employee = require('../models/employee')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const secret_key = process.env.secret_key;


export const getAllEmployees = async ()=>{
    const data = await employee.findAll()
    return {
        code:200,
        data:data,
        message:"Records fetched successfully."
    };
}

export const createEmployee = async (body)=>{
  
    const data = await employee.create(body);
    return{
        code:200,
        data:data,
        message: "Employee created successfully"
    }  
}

export const updateEmployee = async (params,body) =>{
    const existingEmployee = await employee.findOne({where:{id:params.id}});
    if(existingEmployee){
        const data = await existingEmployee.update(body);
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

export const deleteEmployee = async (params) =>{
    const existingEmployee = await employee.findOne({where:{id:params.id}});
    if(existingEmployee){
        const data = await existingEmployee.destroy();
        return {
            code:200,
            message:"Employee record deleted successfully"
        }
    }else{
        return{
            code:400,
            data:`Employee with id ${id} does not exist.`,
            message:'Invalid data.' 
        }
    }
}