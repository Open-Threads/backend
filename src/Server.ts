import express, { Application, Router } from "express";
import cors from "cors";

export default class Server {
  private readonly app: Application = express();

  constructor(private port: number, routers: Array<Router>) {
    this.app.use(cors());
    this.app.use(express.json());

    routers.forEach((router: Router): void => {
      this.app.use(router);
    });
  }

  public init(): void {
    this.app.listen(this.port, (): void =>
      console.log("Server running on port:", this.port),
    );
  }
}
