//routes định hướng cho app

const userController = require('../api/controllers/userController');
const siteController = require('../api/controllers/homePage');

exports.initRoutes = function(app,express){
    app.get('/', siteController.index);

    const apiRoutes = express.Router();

    var userRoutes = express.Router();
    apiRoutes.use('/user',userRoutes);
    userRoutes.post('/login',userController.login);


    // Set url for API group routes
    app.use('/api',apiRoutes);
}