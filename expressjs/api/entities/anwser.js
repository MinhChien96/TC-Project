var models = require("./index");

module.exports = (sequelize, DataTypes) => {
    var anwser = sequelize.define('anwser', {
        idanwser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        result: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idquestion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true, timestamps: false,
        // classMethods: {
        //     associate: function (models) { // eslint-disable-line no-unused-vars
        //         Anwser.belongsTo(models.Question, {
        //             foreignKey: 'idquestion',
        //             targetKey: 'idquestion'
        //         });
        //     },
        // }
    });
    anwser.associate = function (models) {
        anwser.belongsTo(models.question,{foreignKey: 'idquestion', targetKey: 'idquestion'});
    };
    return anwser;
}