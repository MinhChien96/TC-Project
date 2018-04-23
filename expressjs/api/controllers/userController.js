//chứa các controller, nhận các req,res từ routes
'use strict'
const jwt = require('jsonwebtoken');
const privateKey = require('../../config/auth').privateKey;

const userService = require('../services/userService');
//login
exports.login = async (req, res) =>{
    var response = {};
    await userService.findByUserName(req.body.userName).then( async result=>{
        if(result!=""){
            await result.comparePassword(req.body.passWord).then(async isMatch=>{
                if(isMatch){
                    let exp = Date.now()+86400000;//1 ngay
                    let playload = {id:result.idacc,exp:exp};
                    //let playload = {id:result.idacc};
                    let token = jwt.sign(playload,privateKey);
                    await userService.updateLogin(result.idacc,1);
                    response = { success: true, message: "Login success !",data:{token:token,exp:exp}};
                }
                else{
                    response = { success: false, message: "Password wrong !" };
                }
            }).catch(err=>{
                response = { success: false, message: "Password wrong !" };
            });
            // res.json(response);
        }
        else{
            response = { success: false, data: result, message: "Can not found" };
            // res.json(response);
        }
    }).catch(err=>{
        response = { success: false, data: null, message: err };
        // res.json(response);
    });
    res.json(response);
}
//create account
exports.signup = (req,res)=>{
    let user = {
        //idacc : 0,
        username : req.body.userName,
        password : req.body.passWord,
        islogin : 0,
        level : req.body.level,
    }
    return userService.create(user,res);
}

// exports.findAllQues = function(req,res){
//     userService.findAllQues().then(result=>{
//         res.json(result);
//     }).catch(err=>{
//         res.json(err);
//     })
// }
exports.logout = async (req,res)=>{
    var response = {};
    await userService.updateLogin(req.body.id,0).then(result=>{
        response = {success:true,message:"Thanh cong"};
    }).catch(err=>{
        response = {success:false,message:"Thất bại"};
    })
    res.json(response);
}


exports.getAllUser = async (req,res)=>{
    var response = {};
    await userService.findAll().then(result =>{
        response = {success:true, data: result, message: null};
    }).catch(err=>{
        response = {success:false, data: null, message: err+''};
    });
    res.json(response);
}