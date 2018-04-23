const userService = require('../services/userService');

exports.isAmin = (req,res,next)=>{
    if(req.user.level == 'admin')
    next();
    else res.json("Only admin use this api");
}
