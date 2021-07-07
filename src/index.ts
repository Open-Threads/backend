import Server from "./Server";
import Env from "./config/Env";

import "./database/connect";

const server: Server = new Server(Env.PORT, []);

server.init();
