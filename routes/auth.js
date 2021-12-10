import { Router } from 'express'
import { userControllers } from "../controllers/auth.js";

export const authRouter = Router();

authRouter.post( '/signup', userControllers.signup );

