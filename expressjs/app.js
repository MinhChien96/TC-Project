const db = require('./api/entities');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const routes = require('./config/routes');
var morgan = require('morgan');
var fs = require('fs');


const app = express();
app.set('view engine', 'ejs');

//middware để nhận dữ liệu từ body req, có cái này mới sử dụng ddc req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


// Enable CORS from client-side, cách khắc phục lỗi hôm trước ae không test api đc
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


routes.initRoutes(app, express);//routes

app.use(morgan('dev'));//log mọi request


var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Server running is port: ",port);
});

