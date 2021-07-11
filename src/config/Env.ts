import "dotenv/config";

export default class Env {
  public static PORT: number = Number(process.env.PORT) || 8080;
  public static MONGO_URL: string =
    process.env.MONGO_URL || "mongodb://localhost/open-threads";
  public static TOKEN_SECRET: string = process.env.TOKEN_SECRET!;
  public static TOKEN_DURATION: string = process.env.TOKEN_DURATION || "7h";
}
