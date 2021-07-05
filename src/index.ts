import Server from "./Server";
import Env from "./config/Env";

const server: Server = new Server(Env.PORT, []);

server.init();
