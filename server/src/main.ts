import mongoose from "mongoose";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import app from "./express";
import logger from "./utils/logger";
import job from "./jobs/cron";

dotenv.config();
const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", false);

const DB_CONNECTION_STRING =
  process.env.MONGO_URI || "mongodb://localhost:27017/to-do";

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connect to database");
  } catch (e: any) {
    logger.error(e, "Failed to connect to database. Goodbye");
    process.exit(1);
  }
}

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  job.start();
  const host = (server?.address() as AddressInfo)?.address;
  const port = (server?.address() as AddressInfo)?.port;
  logger.info(`Server listening at http://${host}:${port}`);
});
