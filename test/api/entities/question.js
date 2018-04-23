var models = require("./index");

module.exports = (sequelize, DataTypes) => {
    var Question = sequelize.define('question', {
        idquestion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        insub: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function (models) { // eslint-disable-line no-unused-vars
                // associations can be defined here
                Question.hasMany(models.Anwser, {
                    foreignKey: 'idquestion',
                    sourceKey: 'idquestion'
                });
                // Question.belongsTo(models.Subject, {
                //     foreignKey: 'idsub',
                //     targetKey: 'idsub'
                // });
            },
        },
    });
    return Question;
}