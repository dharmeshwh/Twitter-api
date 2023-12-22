import "reflect-metadata";

import dotenv from "dotenv";
import * as http from "http";

import app from "./app";
import { dataSource } from "./typeorm/configs/data-source";

dotenv.config({ path: "../.env " });

const main = async () => {
  const PORT = process.env.PORT;

  // init database
  const database = await dataSource.initialize();

  const server = http.createServer(app);

  // Start the server
  server.listen(PORT, async () => {
    console.info(`listening on port ${PORT}`);
  });

  // Event handler for server errors
  server.on("error", async (err) => {
    if (err) {
      console.error("Server crashed while listening", err);
      await database.destroy();
      throw err;
    }
  });

  // Event handler for server close
  server.on("close", async () => {
    console.warn("Closing server connection");
    await database.destroy();
  });
};

main();
