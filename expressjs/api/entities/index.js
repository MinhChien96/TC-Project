var mysql = require("mysql");
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'HTDH'
});

module.exports = connection;
