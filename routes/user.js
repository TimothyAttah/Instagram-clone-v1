const userRouter = require( 'express').Router();
const { userControllers } = require("../controllers/user");
const { auth } = require ('../middlewares/auth');



userRouter.get( '/', userControllers.getAllUsers );

userRouter.get( '/user/:userId', auth, userControllers.getAUser );

userRouter.put( '/update-info', auth, userControllers.updateUser );

userRouter.delete( '/user/:userId/delete-account', auth, userControllers.deleteUser );

userRouter.put('/follow', auth, userControllers.followUser);

userRouter.put('/unfollow', auth, userControllers.unfollowUser);

userRouter.put( '/update-pic', auth, userControllers.updateUserPic );

userRouter.get('/search-users', auth, userControllers.searchUser);

userRouter.post('/search-users', auth, userControllers.searchUsername);


module.exports = userRouter;