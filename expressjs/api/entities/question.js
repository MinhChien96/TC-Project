var models = require("./index");

module.exports = (sequelize, DataTypes) => {
    var Question = sequelize.define('Question', {
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
            associate: function (models)  { // eslint-disable-line no-unused-vars
                // associations can be defined here
                Question.hasMany(models.Anwser, { foreignKey: 'idquestion', sourceKey: 'idquestion'  });
            },
        },
    });
    return Question;
}