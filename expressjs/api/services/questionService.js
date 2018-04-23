
const db = require('../entities');

exports.findAll = idsub=>{
    return db.question.findAll({
        where:{
            idsub: idsub,
        },
        include:[{
            model: db.anwser,
            // as: 'anwser'
            attributes:{ exclude: ['result'] },
        }]
    })
}

exports.findAnwser = idquestion=>{
    return db.question.findAll({
        where:{
            idquestion: idquestion
        },
        include:[{
            model: db.anwser,
            attributes:['idanwser'],
            where:{result:1}
        }],
        attributes:['idquestion']
    })
}