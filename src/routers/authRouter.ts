import {Router} from "express";
import { login, signup } from "../controllers/authController";
import validateSchema from "../middlewares/validateSchema";
import { newUser, user } from "../schemas/authSchema"

const authRouter = Router();

authRouter.post('/signup', validateSchema(newUser), signup);
authRouter.post('/login', validateSchema(user), login);

export default authRouter;