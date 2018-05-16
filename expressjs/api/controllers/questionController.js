'use strict'

const questionService = require('../services/questionService');
const userService = require('../services/userService');

exports.getRdQues = (req, res) => {
    var response = {};
    questionService.findAll(1).then(result => {
        if (result != "") {
            response = {
                success: true,
                data: result
            };
            res.json(response);
        } else {
            response = {
                success: false,
                data: result,
                message: "No question found"
            };
            res.json(response);
        }
    }).catch(err => {
        response = {
            success: false,
            data: null,
            message: err
        };
        res.json(response);
    })
}
exports.checkResult = async function (req, res) {
    var response = {};
    var point = 0;
    var arrAnwer = req.body;
    if (!Array.isArray(arrAnwer)) {
        response = {
            success: false,
            data: null,
            message: 'Input err'
        };
    } else {
        // arrAnwer.forEach( arr => {
        //     questionService.findAnwser(arr.idquestion).then(result => {
        //         console.log(result[0].anwsers[0].idanwser);
        //         if(result[0].anwsers[0].idanwser==arr.idanwser){
        //             point++;
        //         }
        //     }).catch(err=>{
        //         response={success:false,data:null,message: 'Err in server'};
        //         console.log(err);
        //         res.json(response);
        //         return;
        //     })
        // });
        // response={success:true,data:point,message:'Result : '+point};
        // res.json(response);
        var i = 0;
            for(i;i<arrAnwer.length-1;i++){
                await questionService.findAnwser(arrAnwer[i].idquestion).then(result => {
                    // console.log(result[0].anwsers[0].idanwser + " "+ arrAnwer[i].idanwser);
                    if(result[0].anwsers[0].idanwser==arrAnwer[i].idanwser){
                        point++;
                    }
                }).catch(err=>{
                    response={success:false,data:null,message: 'Err in server'};
                    console.log(err);
                    res.json(response);
                    return;
                })
            }
            // console.log(i);
            // update db
            // console.log(req.user);
        let rel = await userService.updatePoint(req.user.idacc,point,arrAnwer[i].timespent);
        if(rel){
            response={success:true,data:point,message:'Result : '+point};
            res.json(response);
        }
        else{
            response={success:false,data:null,message: 'Err in server'};
            res.json(response);
        }
    }
}

//for learn Transactions

exports.transactionCreate = (req,res)=>{
    return questionService.createSubject(req,res);
}