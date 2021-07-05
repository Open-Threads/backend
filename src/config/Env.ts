import "dotenv/config";

export default class Env {
  public static PORT: number = Number(process.env.PORT) || 8080;
}
