//chứa các controller, nhận các req,res từ routes
'use strict'
const jwt = require('jsonwebtoken');
const privateKey = require('../../config/auth').privateKey;
var fs = require('fs');


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
                    let point = result.point;
                    let timespent = result.timespent;
                    let level = result.level;
                    await userService.updateLogin(result.idacc,1);
                    response = { success: true, message: "Login success !",data:{
                        token:token,
                        exp:exp,
                        level:level,
                        point:point,
                        timespent:timespent
                    }};
                }
                else{
                    response = { success: false, message: "Password wrong !" };
                }
            }).catch(err=>{
                response = { success: false, message: "Password wrong !" };
            });
        }
        else{
            response = { success: false, data: result, message: "Can not found" };
        }
    }).catch(err=>{
        response = { success: false, data: null, message: err };
    });
    res.json(response);
}
//create account
exports.signup = (req,res)=>{
    let user = {
        username : req.body.username,
        password : req.body.password,
        level: "user",
        name: req.body.name,
        birth: req.body.birth,
        adress: req.body.adress,
        gender: req.body.gender,
        islogin : 0,
        cv: req.body.cv,
        email: req.body.email,
        phone: req.body.phone,
        note: req.body.note      
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

exports.getUserById = async (req,res)=>{
    var response = {};
    var id = parseInt(req.params.id);
    if(isNaN(id)){
        response = {success: false,message: "type id is number"};
        res.json(response);
        return;
    }
    await userService.findById1(id).then(result=>{
        if(result != null) response = {success:true, data: result, message: null};
        else response = {success:true, data:null, message: "Cannot find user"};
    }).catch(err=>{
        response = {success:false, data: null, message: err+''};
    })
    res.json(response);
}

exports.upload = (req,res)=>{
    res.json({success:true});
}

exports.getCv = (req,res)=>{
    var filename = req.params.filename;
    fs.readFile("./uploads/"+filename, function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    })
}

exports.update = (req,res)=>{
    let user = {
        idacc : req.body.idacc,
        username : req.body.username,
        password : req.body.password,
        name: req.body.name,
        birth: req.body.birth,
        adress: req.body.adress,
        gender: req.body.gender,
        cv: req.body.cv,
        email: req.body.email,
        phone: req.body.phone,
        note: req.body.note        
    }
    return userService.update(user,res);
}

exports.delete = (req,res)=>{
    return userService.delete(req.body,res);
}