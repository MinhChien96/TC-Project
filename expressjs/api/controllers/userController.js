'use strict'

const userService = require('../services/userService');

exports.create = function(req,res){
    return userService.create(req.body,res);
}