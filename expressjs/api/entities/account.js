'use strict'

var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
const salt = 10;

module.exports = (sequelize, DataTypes) => {
    var account = sequelize.define('account',{
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
        },
        level:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING
        },
        birth: DataTypes.DATE,
        adress: DataTypes.STRING,
        gender: DataTypes.STRING,
        islogin:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        }
    },{freezeTableName: true,timestamps: false});

    account.beforeCreate((account, options) => {
        return new Promise((resolve, reject)=>{
            cryptPassword(account.password,(err,hash)=>{
                if(err) return reject(err);
                account.password = hash;
                return resolve(account,options);
            })
        })
      });

    account.prototype.comparePassword = function(passw){
        //console.log(this.password);
        //console.log(this);
        return bcrypt.compare(passw, this.password)
    }

    return account;
}

function cryptPassword(password, callback) {
    bcrypt.genSalt(salt, function(err, salt) { // Encrypt password using bycrpt module
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, function(err, hash) {
            return callback(err, hash);
        });
    });
}

