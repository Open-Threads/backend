import { connect } from "mongoose";

import Env from "../config/Env";

connect(
  Env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (): void => console.log("Connected to database"),
);
