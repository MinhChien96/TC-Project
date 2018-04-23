//nằm giữa controller và database, để tách rời các res,req, chỉ truyền vào các biến để dễ debug

const db = require("../entities");

//
exports.findByUserName = function (userName) {
    return db.account.findOne({
        where: {
            username: userName
        }
    });
}

exports.findById = function (id) {
    return db.account.findOne({
        where:{ idacc: id},
        attributes:['idacc','username','password','level','islogin']
    });
}

exports.findAll = ()=>{
    return db.account.findAll({
        attributes:['idacc','username','password']
    });
}

exports.create = async (user,res)=>{
    let response = {};
    await db.account.findAll({
        where: { username: user.username},
        attributes:['username']
    }).then(result=>{
        if(result!=""){
            response = {success: false,message: "User is exist"};
            res.json(response);
        }
    }).catch(err=>{
        response = {success: false,message: err};
        res.json(response);return;
    });
    await db.account.build(user).save().then(()=>{
        response = {success: true,message: "Create user success"};
        res.json(response);
    }).catch(err=>{
        response = {success: false,message: err};
        res.json(response);
    })
    // return await db.account.build({username :user.userName,password:user.password,islogin:user.islogin,level: user.level}).save().then(result=>{
    //     response = {success: true,message: "Create user success"};
    //     res.json(response);
    // }).catch(err=>{
    //     response = {success: false,message: err};
    //     res.json(response);
    // })
}
exports.updateLogin = (id,isLogin)=>{
    return db.account.findOne({
        where: {idacc:id}
    }).then(result=>{
        if(result){
            result.islogin = isLogin;
            return result.save();
        }
        else{
            return Promise.reject(false);
        }
    })
}
