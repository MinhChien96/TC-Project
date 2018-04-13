var mysql = require("mysql");
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz'
});

module.exports = connection;
