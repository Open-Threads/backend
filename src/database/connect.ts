import { connect } from "mongoose";

import Env from "../config/Env";

connect(
  Env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (): void => console.log("Connected to database"),
);
