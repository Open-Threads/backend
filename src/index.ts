import Server from "./Server";
import Env from "./config/Env";

import "./database/connect";

import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";

const server: Server = new Server(Env.PORT, [userRouter, authRouter]);

server.init();
