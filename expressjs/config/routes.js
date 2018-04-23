const passport = require('passport');
const requiredAuth = passport.authenticate('jwt', {
    session: false
});
//routes định hướng cho app


const userController = require('../api/controllers/userController');
const siteController = require('../api/controllers/homePage');
const questionController = require('../api/controllers/questionController');
const auth = require('../api/middleware/auth');

exports.initRoutes = function (app, express) {
    app.get('/', siteController.index);

    const apiRoutes = express.Router();

    //user routes
    var userRoutes = express.Router();
    apiRoutes.use('/user', userRoutes);
    userRoutes.post('/login', userController.login);
    userRoutes.get('/', [requiredAuth, auth.isAmin], userController.getAllUser) //get all user - admin
    userRoutes.post('/signup', userController.signup);
    userRoutes.post('/logout', userController.logout);

    //question
    var questionRouters = express.Router();
    apiRoutes.use('/question', questionRouters); //xác nhận người dùng
    questionRouters.get('/', requiredAuth, questionController.getRdQues);
    questionRouters.post('/checkResult',requiredAuth, questionController.checkResult);

    // Set url for API group routes
    app.use('/api', apiRoutes);
}