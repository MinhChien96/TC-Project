'use strict'

const subjectService = require('../services/subjectService');



exports.getAllSub = (req,res)=>{
    subjectService.findAll().then(result=>{
        res.json({success:true,data:result});
    })
    .catch(err=>{
        res.json({success:false,err:err+''});
    })
}