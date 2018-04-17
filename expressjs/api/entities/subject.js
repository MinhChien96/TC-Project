module.exports = (sequelize, DataTypes) => {
    var Subject = sequelize.define('subject', {
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
        // freezeTableName: true,
        // classMethods: {
        //     associate(models) { // eslint-disable-line no-unused-vars
        //         // associations can be defined here
        //         // models.Subject.hasMany(models.Question, {
        //         //     foreignKey: 'idsub',
        //         //     sourceKey: 'idsub'
        //         // });
        //     },
        // }
    });
    // Subject.associate = function (models) {
    //     models.Subject.hasMany(models.Question,{foreignKey: 'idsub', sourceKey: 'idsub'});
    // };
    return Subject;
}