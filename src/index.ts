import Server from "./Server";
import Env from "./config/Env";

import "./database/connect";

import userRouter from "./routers/userRouter";

const server: Server = new Server(Env.PORT, [userRouter]);

server.init();
