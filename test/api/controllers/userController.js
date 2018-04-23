//chứa các controller, nhận các req,res từ routes
'use strict'

const userService = require('../services/userService');

exports.login = function (req, res) {
    var response = {};
    //res.json("trieu");return;
    userService.findByUserName(req.body.userName).then(result=>{
        resjson(result);
    }).catch(err=>{
        res.json(err);
    });
}