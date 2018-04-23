module.exports = (sequelize, DataTypes) => {
    var subject = sequelize.define('subject', {
        idsub: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        namesub: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        // classMethods: {
        //     associate(models) { // eslint-disable-line no-unused-vars
        //         // associations can be defined here
        //         Subject.hasMany(models.Question, {
        //             foreignKey: 'idsub',
        //             sourceKey: 'idsub'
        //         });
        //     },
        // }
    });
    subject.associate = function (models) {
        subject.hasMany(models.question, {
            foreignKey: 'idsub',
            sourceKey: 'idsub'
        });
    };
    return subject;
}