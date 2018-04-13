//chứa các controller, nhận các req,res từ routes
'use strict'

const userService = require('../services/userService');

exports.login = function (req, res) {
    // userService.findByUserName(req.body.userName).then(function(result){
    //     console.log(result);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // console.log(req.body);
    // return res.send(req.body);
    var response = {};
    userService.findByUserName(req.body.userName, function (err, row) {
        if (err || row=="") response = {
            success: false,
            message: 'Cannot find user',
            data: null
        };
        else {
            if (row[0].password == req.body.passWord) {
                response = {
                    success: true,
                    message: 'Ok',
                    data: row
                };
            }
            else{
                response = {
                    success: false,
                    message: 'incorrect password ',
                    data: null
                };
            }
        }
        res.json(response);
    });
}