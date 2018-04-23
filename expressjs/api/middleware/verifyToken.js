var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require("../../config/auth").privateKey;
const userService = require('../services/userService')

exports.initVerifyToken = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//extra token from header
    opts.secretOrKey = secret;//privateKey
    passport.use(new JwtStrategy(opts, function (jwt_payload, next) {
        let date = Date.now();
        if(jwt_payload.exp<date){
            next("token het han",false);
        }
        userService.findById(jwt_payload.id).then(user=>{
            if(user.islogin==0){
                let err = "token sai";
                next(err);
            }
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        }).catch(err=>{
            return next(err,false);
        })
    }));
};