import { Router } from 'express'
import { authControllers } from "../controllers/auth.js";
import { auth } from '../middlewares/auth.js';

export const authRouter = Router();

authRouter.post( '/signup', authControllers.signupUser );

authRouter.post( '/signin', authControllers.signinUser );

authRouter.post('/change-username', auth, authControllers.changeUsername);