import express from "express";
import bodyParser from "body-parser";
import { refreshToken, userLogin, userLogout, userRegister } from "../controllers/userController.js";
import cookieParser from "cookie-parser";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register', bodyParser.json(), userRegister);
userRouter.post('/refresh_token', cookieParser(), auth, refreshToken);
userRouter.get('/logout', userLogout );
userRouter.post('/login', bodyParser.json(), userLogin );

export default userRouter;
