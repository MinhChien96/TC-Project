var models = require("./index");

module.exports = (sequelize, DataTypes) => {
    var question = sequelize.define('question', {
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
        idsub: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'doc' 
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        // classMethods: {
        //     associate: function (models)  { // eslint-disable-line no-unused-vars
        //         // associations can be defined here
        //         Question.hasMany(models.Anwser, { foreignKey: 'idquestion', sourceKey: 'idquestion'  });
        //         Question.belongsTo(models.Subject, {
        //             foreignKey: 'idsub',
        //             targetKey: 'idsub'
        //         });
        //     },
        // },
    });
    question.associate = function (models) {
        question.hasMany(models.anwser, {
            foreignKey: 'idquestion',
            sourceKey: 'idquestion'
        });
        question.belongsTo(models.subject, {
            foreignKey: 'idsub',
            targetKey: 'idsub'
        });
    }
    return question;
}