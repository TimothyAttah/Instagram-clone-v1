import { Router } from 'express'
import { authControllers } from "../controllers/auth.js";

export const authRouter = Router();

authRouter.post( '/signup', authControllers.signupUser );

authRouter.post( '/signin', authControllers.signinUser );