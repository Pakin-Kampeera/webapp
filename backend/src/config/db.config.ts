import { createConnection } from "typeorm";

export const initializeConnection = async (): Promise<void> => {
  console.log("Connecting to database...");
  try {
    await createConnection();
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
  }
};