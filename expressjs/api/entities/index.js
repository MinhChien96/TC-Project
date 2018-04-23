'use strict';

var fs = require('fs'); //thư viện đọc file
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env]; //đọc thông tin trong config ở development
var db = {};

if (config.use_env_variable) { //đoạn này không rõ
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  // var sequelize = new Sequelize(config.database, config.username, config.password, {
  //   pool: {
  //     max: 5,
  //     idle: 30000,
  //     acquire: 60000,
  //   }
  // });
}

// fs.readdirSync(__dirname)
//   .filter(function (file) {
//     return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "logs");
//   })
//   .forEach(function (file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function (modelName) {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

fs
  .readdirSync(__dirname)
  .filter(file => { //(file !== basename) file đọc khác file hiện tại
    //file.slice(-3) === '.js' đuôi file là .js
    //file.indexOf('.') !== 0 file có tên file. - dấu . không ở đầu file
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file)); //đoạn này không rõ
    db[model.name] = model; //mảng các model
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  // if ("associate" in db[modelName]) {
  //   db[modelName].associate(db);
  // }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;