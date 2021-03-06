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
        },
        point:{
            type:DataTypes.INTEGER,
            defaultValue: -1,
        },
        timespent:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        cv:{
            type:DataTypes.STRING
        },
        note: DataTypes.STRING,
        email:{
            type:DataTypes.STRING
        },
        phone: DataTypes.STRING,
    },{freezeTableName: true,timestamps: false});//timestamps: false => don't add the timestamp attributes (updatedAt, createdAt)
    //freezeTableName: true => vô hiệu hóa việc sửa đổi tên bảng
    //mặc định các table sẽ đc thêm s(số nhiều) ví dụ: accounts

    //mã hóa mật khẩu trước khi insert db
    //using bcryptjs mã hóa
    account.beforeCreate((account, options) => {
        return new Promise((resolve, reject)=>{
            cryptPassword(account.password,(err,hash)=>{
                if(err) return reject(err);
                account.password = hash;
                return resolve(account,options);
            })
        })
      });
    
    //mở rộng phương thức cho các đối tượng
    //so sánh mật khẩu
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

