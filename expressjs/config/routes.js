const passport = require('passport');
const requiredAuth = passport.authenticate('jwt', {
    session: false
});
//routes định hướng cho app

const userController = require('../api/controllers/userController');
const siteController = require('../api/controllers/homePage');
const questionController = require('../api/controllers/questionController');
const subjectController = require('../api/controllers/subjectController');
const auth = require('../api/middleware/auth');

exports.initRoutes = function (app, express,upload) {
    app.get('/', siteController.index);

    const apiRoutes = express.Router();

    //user routes
    var userRoutes = express.Router();
    apiRoutes.use('/user', userRoutes);
    userRoutes.get('/getcv/:filename',userController.getCv);
    userRoutes.post('/login', userController.login);
    userRoutes.get('/isadmin',[requiredAuth, auth.isAmin],(req,res)=>{res.json({success:true})});
    userRoutes.get('/:id', [requiredAuth, auth.isAmin], userController.getUserById);
    userRoutes.get('/', [requiredAuth, auth.isAmin], userController.getAllUser); //get all user - admin
    userRoutes.post('/signup',[requiredAuth, auth.isAmin],userController.signup);
    userRoutes.post('/logout',requiredAuth, userController.logout);
    userRoutes.post('/upload',[requiredAuth, auth.isAmin],upload.array("uploads[]", 12),userController.upload);
    // userRoutes.get('/getcv/:filename',userController.getCv);
    userRoutes.post('/update',[requiredAuth, auth.isAmin],userController.update);
    userRoutes.post('/delete',[requiredAuth, auth.isAmin],userController.delete);
    

    //question
    var questionRouters = express.Router();
    apiRoutes.use('/question', questionRouters); //xác nhận người dùng
    questionRouters.get('/', requiredAuth, questionController.getRdQues);
    questionRouters.post('/checkResult',requiredAuth, questionController.checkResult);
    questionRouters.get('/:idsub',[requiredAuth, auth.isAmin],questionController.findQuesBySub);
    
    //subject
    var subjectRouters = express.Router();
    apiRoutes.use('/subject', subjectRouters);
    subjectRouters.get('/',[requiredAuth, auth.isAmin],subjectController.getAllSub);

    var testTransactions = express.Router();
    apiRoutes.use('/transactions',testTransactions);
    testTransactions.post('/',questionController.transactionCreate)
    // Set url for API group routes
    app.use('/api', apiRoutes);
}