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

exports.findById = function (id) {//dành cho xác thực
    return db.account.findOne({
        where:{ idacc: id},
        attributes:['idacc','username','password','level','islogin']
    });
}

exports.findById1 = function (id) {//dành cho font end, detail user
    return db.account.findOne({
        where:{ idacc: id}
    });
}

exports.findAll = ()=>{
    return db.account.findAll({
        attributes:['idacc','name','birth','adress','gender','point','timespent','cv','note'],
        where:{level : 'user'}
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
    await db.account.build(user).save().then((us)=>{
        response = {success: true,message: "Create user success",data:us.idacc};
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

exports.update = async (user,res)=>{
    try {
        let acc = await db.account.findOne({where:{idacc:user.idacc}});
        if(acc){
            acc.username = user.username;
            acc.password = user.password;
            acc.email = user.email;
            acc.phone = user.phone;
            acc.note = user.note;
            acc.cv = user.cv;
            acc.gender = user.gender;
            acc.adress = user.adress;
            acc.birth = user.birth;
            acc.name = user.name;
            return acc.save().then((r)=>{
                res.json({success:true,data:r.idacc});
            })                 
        }
    } catch (error) {
        return res.json({success:false,message:"Cannot update"});
    }
}
exports.delete = async (arrID,res)=>{
    try {
        for(let i = 0;i<arrID.length;i++){
            await db.account.destroy({
                where:{idacc:arrID[i]}
            });
        }
        res.json({success:true});
    } catch (error) {
        res.json({success:false,message:"Cannot delete"});
    }
}

exports.updatePoint = async (idacc,point,timespent)=>{
    try {
        let user = await db.account.findOne({
            where:{idacc:idacc}
        });
        user.point = point;
        user.timespent = timespent;
        await user.save();
        return true;
    } catch (error) {
        return false;
    }
}
