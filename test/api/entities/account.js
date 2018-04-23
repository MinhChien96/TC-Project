'use strict'
module.exports = (sequelize, DataTypes) => {
    var Account = sequelize.define('account',{
        idacc: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        level:{
            type: DataTypes.STRING
        }
    });
    return Account;
}