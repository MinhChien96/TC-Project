var models = require("./index");

module.exports = (sequelize, DataTypes) => {
    var Anwser = sequelize.define('Anwser', {
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
        classMethods: {
            associate: function (models) { // eslint-disable-line no-unused-vars
                Anwser.belongsTo(models.Question, {
                    foreignKey: 'idquestion',
                    targetKey: 'idquestion'
                });
            },
        }
    });
    // Anwser.associate = function (models) {
    //     models.Anwser.belongsTo(models.Question,{foreignKey: 'idquestion', targetKey: 'idquestion'});
    // };
    return Anwser;
}