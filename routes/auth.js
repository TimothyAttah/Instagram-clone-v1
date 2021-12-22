const authRouter = require('express').Router();
const { authControllers } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');


authRouter.post('/signup', authControllers.signupUser);

authRouter.post('/signin', authControllers.signinUser);

authRouter.post('/change-username', auth, authControllers.changeUsername);

authRouter.post('/change-name', auth, authControllers.changeName);

module.exports = authRouter;
