//nằm giữa controller và database, để tách rời các res,req, chỉ truyền vào các biến để dễ debug

const db = require("../entities");


exports.findByUserName = function(userName,callback){
    return db.query('select * from account where username = "' + userName +'"',callback);
} 