import mongoose from "mongoose";
import config from "../config";

(mongoose as any).Promise = Promise;

const dbOption = {
  autoReconnect: true,
  useNewUrlParser: true,
  poolSize: 5,
};
const db = mongoose.createConnection(config.MONGO.URI, dbOption);

let isConnected: boolean;

db.once("connected", () => {
  isConnected = true;
  // tslint:disable-next-line
  console.log("Mongoose successfully connected");
});

db.on("reconnected", () => {
  // tslint:disable-next-line
  console.log("Mongoose reconnected");
});

db.on("error", (err) => {
  // tslint:disable-next-line
  console.log("Mongoose connection error: " + err);
});

db.on("disconnected", () => {
  // tslint:disable-next-line
  console.log("Mongoose connection disconnected");
});

// Close the Mongoose connection If the Node process ends
process.on("SIGINT", () => {
  db.close(() => {
    // tslint:disable-next-line
    console.log("Mongoose connection closed");
    process.exit(0);
  });
  setTimeout(() => process.exit(0), 1000);
});

export default db;

export function onConnect() {
  return new Promise((resolve) => {
    if (isConnected) {
      resolve(db);
    }
    db.once("connected", () => {
      resolve(db);
    });
  });
}
