const db = require('../entities');

exports.findAll = ()=>{
    return db.subject.findAll();
}