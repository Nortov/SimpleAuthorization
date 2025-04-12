import express from "express";
import dotenv from "dotenv";
import * as DbUtil from "./utils/dbconnecter.js";
import * as StarterUtil from "./utils/starter.js";
import * as UserController from "./controllers/usercontroller.js";
import * as MiddleWare from "./utils/middleware.js";

dotenv.config()

const app = express()
app.use(express.json());

app.post('/api/auth/register', UserController.Register);
app.post('/api/auth/login', UserController.Login)
app.get('/api/auth/getme', MiddleWare.checkAuth, UserController.GetMe)

DbUtil.Connect()
StarterUtil.Listen(app)