import { Router } from 'express';
import { userControllers } from "../controllers/user.js";

export const userRouter = Router();

userRouter.get( '/', userControllers.getAllUsers );
