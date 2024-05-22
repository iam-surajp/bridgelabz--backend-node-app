'use strict';
const { Model, DataTypes,Sequelize } = require('sequelize');
const { default: sequelize } = require('../config/database');

module.exports  = (sequelize,DataTypes)=>{
    class employee extends Model{
        static associate(models) {
            // define association here
          }
    }
    employee.init(
       { name:DataTypes.STRING,
        gender:DataTypes.STRING,
        department:DataTypes.STRING,
        salary:DataTypes.STRING,
        start_date:{
            type:DataTypes.DATE,
            defaultValue:Sequelize.NOW
        }
        
    },
    {
        sequelize,
        modelName:'employee'
    }
    )
return employee;
}