
const db = require('../entities');

exports.findAll = idsub => {
    return db.question.findAll({
        where: {
            idsub: idsub,
        },
        include: [{
            model: db.anwser,
            // as: 'anwser'
            attributes: { exclude: ['result'] },
        }]
    })
}

exports.findAnwser = idquestion => {
    return db.question.findAll({
        where: {
            idquestion: idquestion
        },
        include: [{
            model: db.anwser,
            attributes: ['idanwser'],
            where: { result: 1 }
        }],
        attributes: ['idquestion']
    })
}


//for learn transaction
exports.createSubject = (req, res) => {
    //có 2 cách viết: xets trong ví dụ: thêm subject rồi thêm question,thằng nào lỗi rollback
    //cách 1: auto callback
    // return db.sequelize.transaction(t=>{
    //     var subject = req.body.subject;
    //     return db.subject.create(subject,{transaction: t})
    //     .then(sub=>{
    //         var question = req.body.question;
    //         question.idsub = sub.idsub;
    //         // question.idsub = 0;//bỏ comment dòng này để thấy rollback chạy do không create đc question,subject đc rollback
    //         return db.question.create(question,{transaction:t});
    //     })
    // })
    // .then(result=>{
    //     //transaction has been commit
    //     res.json({success:true,data:result});
    // })
    // .catch(err=>{
    //     // transaction has been rollback    
    //     res.json({success:false,err:err});
    // })

    //cách 2:
    //tự commit,rollback
    // return db.sequelize.transaction().then(t=>{
    //     var subject = req.body.subject;
    //     return db.subject.create(subject,{transaction: t})
    //     .then((sub)=>{
    //         var question = req.body.question;
    //         question.idsub = sub.idsub;
    //         question.idsub = 0;
    //         return db.question.create(question,{transaction: t})
    //         .then(ques=>{
    //             res.json({success:true,data:ques});
    //             return t.commit();
    //         })
    //     })
    //     .catch(err=>{
    //         res.json({success:false,err:err});
    //         return t.rollback();       
    //     })
    // });

    //cách 3: async await
    return db.sequelize.transaction().then(async t=>{
        try {
            let subject = req.body.subject;
            let resultSub = await db.subject.create(subject,{transaction:t});
            let question = req.body.question;
            // question.idsub = sub.idsub;
            question.idsub = 0;
            await db.question.create(question,{transaction: t});
            res.json({success:true})
            return t.commit();
        } catch (error) {
            //chú ý đoạn này, commit,rollback trả về một Promise nên viết res.json khi rollback,commit thành công
            //res.json({success:false,error:error});
            return t.rollback().then(()=>{res.json({success:false,error:error});});
        }
    })

    //2 transaction lồng nhau
    // return db.sequelize.transaction().then(t => {
    //     return db.sequelize.transaction().then(async t1=>{
    //         try {
    //             let subject = req.body.subject;
    //             let resultSub = await db.subject.create(subject,{transaction : t});
    //             let question = req.body.question;
    //             question.idsub = 0;
    //             await db.question.create(question,{transaction: t1});
    //             await t.commit();
    //             await t1.commit();
    //             res.json({success:true});
    //         } catch (error) {
    //             await t.rollback();
    //             res.json({success:false});
    //         }
    //     })
    // })
}