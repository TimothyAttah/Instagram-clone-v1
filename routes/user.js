import { Router } from 'express';
import { userControllers } from "../controllers/user.js";
import { auth } from '../middlewares/auth.js';

export const userRouter = Router();

userRouter.get( '/', userControllers.getAllUsers );

userRouter.get( '/user/:userId', auth, userControllers.getAUser );

userRouter.put( '/update-info', auth, userControllers.updateUser );

userRouter.delete( '/user/:userId/delete-account', auth, userControllers.deleteUser );

userRouter.put('/follow', auth, userControllers.followUser);

userRouter.put('/unfollow', auth, userControllers.unfollowUser);

userRouter.put( '/update-pic', auth, userControllers.updateUserPic );

userRouter.get('/search-users', auth, userControllers.searchUser);

userRouter.post('/search-users', auth, userControllers.searchUsername);
