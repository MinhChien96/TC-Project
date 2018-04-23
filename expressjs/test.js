const Sequelize = require('sequelize');
const sequelize = new Sequelize('quiz', 'root', 'chien8496', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    const Anwser = sequelize.define('anwser', {
        idanwser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        result: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idquestion: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true,timestamps: false,
        // classMethods: {
        //     associate: function (models) { // eslint-disable-line no-unused-vars
        //         Anwser.belongsTo(models.Question, {
        //             foreignKey: 'idquestion',
        //             targetKey: 'idquestion'
        //         });
        //     },
        // }
    });
        Anwser.belongsTo(Question,{foreignKey: 'idquestion', targetKey: 'idquestion'});
    var Question = sequelize.define('question', {
        idquestion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        level: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        idsub: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        Question.hasMany(Anwser, {
            foreignKey: 'idquestion',
            sourceKey: 'idquestion'
        });
        Question.belongsTo(Subject, {
            foreignKey: 'idsub',
            targetKey: 'idsub'
    });
    var Subject = sequelize.define('subject', {
        idsub: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        namesub: {
            type: Sequelize.STRING,
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
        Subject.hasMany(Question, {
            foreignKey: 'idsub',
            sourceKey: 'idsub'
        });