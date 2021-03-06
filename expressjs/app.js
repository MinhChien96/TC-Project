const db = require('./api/entities');
const bodyParser = require('body-parser');
const express = require('express');
var multer = require('multer');
const path = require('path');
const routes = require('./config/routes');
var morgan = require('morgan');
var fs = require('fs');
const passport = require('passport');
var verifyToken = require('./api/middleware/verifyToken');


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Enable CORS from client-side,
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
//upload cv
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });


verifyToken.initVerifyToken(passport);
routes.initRoutes(app, express, upload);//routes


var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Server running is port: ",port);
});
// db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
//     db.sequelize.sync({ force: true }, { logging: console.log }).then(function () {
//         app.listen(port,function(){
//             console.log("Server running is port: ",port);
//         });
//    })
// });

