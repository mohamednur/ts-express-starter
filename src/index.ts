import { Routes } from "./types/routes";
import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});
import config from "config";
import express from "express";
import morgan from "morgan";
import { logger, stream } from "./utils/logger";
import errorMiddleware from "./middlewares/errorMiddleware";

const LOG_FORMAT = config.get<string>("LOG_FORMAT");
class App {
  public app: express.Application;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = config.get<number>("PORT");
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorMiddleWare();
  }
  public listen = () => {
    this.app.listen(this.port, () => {
      // console.log(`app is listening at ${this.port}`);
      logger.info("some message");
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`-----env---`);
    });
  };

  public getServer = () => {
    return this.app;
  };

  private initializeMiddlewares = () => {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api/v1/", route.router);
    });
  }
  private initializeErrorMiddleWare = () => {
    this.app.use(errorMiddleware);
  };
}

export default App;
