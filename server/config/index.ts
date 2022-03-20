import * as path from "path";
import * as dotenv from "dotenv";

const envObj: any = dotenv.config({
  path: path.resolve(__dirname, "../", "../", ".env"),
});

if (envObj.error) {
  throw envObj.error;
}

const {
  AUTH_JWT_SECRET,
  NODE_ENV: ENV,
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
  IP,
  APP_URL,
  SSR_URL,
  BROWSER_URL,
} = process.env;

const isProduction = ENV === "production";
const isStage = ENV === "development" || ENV === null;

const all = {
  ENV,
  isProduction,
  isStage,

  // Root path of server
  // root: path.normalize(__dirname + "/../../.."),

  // Redirect configs
  REDIRECT_URI: {
    BROWSER: isProduction ? APP_URL : APP_URL,
    SSR: isProduction ? APP_URL : APP_URL,
  },

  // Server port
  PORT,

  // Server IP
  ip: IP,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: "mean-ssr-secret",
  },

  JWT: {
    SECRET: AUTH_JWT_SECRET || "secret",
    SALT_ROUNDS: SALT_ROUNDS || 10,
  },

  MONGO: {
    URI: MONGODB_URI,
  },
  APP_URL,

  // AWS Config

  DEFAULT_SESSION_TIME: 15552000000 * 2, // 12 Months
};

export default all;
