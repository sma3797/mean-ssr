import * as AngularServer from "./angular-server";

import express from "express";
import expressSession from "express-session";
import connectMongo from "connect-mongo";
import http from "http";
import { join } from "path";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import i18n from "i18n";
import * as ejs from "ejs";

import config from "./config";
import { onConnect } from "./db";
import api from "./api";
import i18nObj from "./i18n";

declare module "express" {
  export interface Request {
    account: any;
    accountId: string;
    userId: string;
    profileDomain: string;
  }

  export interface Response {
    __: any;
  }
}

declare module "express-session" {
  export interface SessionData {
    accountId: string;
  }
}

const MongoStore = connectMongo(expressSession);

let clientDistFolder: any;
let ssrDistFolder: any;
let indexHtml: any;
let server: any;

function app(db: any): express.Express {
  server = express();
  clientDistFolder = join(process.cwd(), "dist/client-browser");
  ssrDistFolder = join(process.cwd(), "dist/client-ssr/browser");
  indexHtml = "index.html";

  server.engine("html", ejs.renderFile);
  AngularServer.init(server);
  server.set("view engine", "ejs");
  server.set("view engine", "html");
  server.set("views", ssrDistFolder);
  server.use("/app/", express.static(clientDistFolder));
  server.get("*.*", express.static(ssrDistFolder));

  configureLocalization();
  configEnv(db);
  initApi();
  setClientViews();
  AngularServer.setSSRViews(server, indexHtml);

  return server;
}

function configEnv(db: any) {
  const cookieConfig: any = {
    maxAge: config.DEFAULT_SESSION_TIME,
  };
  let origin: any = true;
  if (config.isProduction || config.isStage) {
    server.set("trust proxy", true);
    cookieConfig.domain = "something.com";
    origin = /\.meain-ssr\.io$/;
  } else {
    cookieConfig.domain = "localhost";
  }
  server.use(helmet.frameguard());
  server.use(express.json({ limit: "5mb" }));
  server.use(express.urlencoded({ limit: "5mb", extended: true }));
  server.use(i18n.init);
  server.use(methodOverride());
  server.use(cookieParser());
  server.use(
    expressSession({
      store: new MongoStore({
        mongooseConnection: db,
      }),
      name: "mc.connect.yid",
      resave: false,
      saveUninitialized: false,
      secret: "meanssr",
      cookie: cookieConfig,
    }),
  );

  server.use(cors({ credentials: true, origin: true }));
}

function initApi() {
  server.use("/api", api);
}

function setClientViews() {
  server.get(/^\/app\/[^.]*$/, (req: any, res: any, next: any) => {
    console.log("IN1");
    return res.sendFile(`${clientDistFolder}/index.html`);
  });
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  Promise.all([onConnect()]).then(([db]) => {
    server = http.createServer(app(db));
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  });
}

process.on("uncaughtException", exceptionHandler("uncaughtException"));
process.on("unhandledRejection", exceptionHandler("unhandledRejection"));

run();

function configureLocalization() {
  i18n.configure({
    locales: ["en"],
    directory: __dirname + "\\i18n\\locales",
    register: i18nObj,
  });
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof config.PORT === "string" ? "Pipe " + config.PORT : "Port " + config.PORT;
  switch (error.code) {
    case "EACCES":
      // tslint:disable-next-line
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // tslint:disable-next-line
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  console.log(`Listening on ${config.PORT}`);
}

function exceptionHandler(msg: any) {
  return (error: any) => {
    if (!(error instanceof Error)) {
      error = new Error(JSON.stringify(error));
    }
    console.error(new Date().toUTCString(), msg + ":", error.stack);
  };
}
