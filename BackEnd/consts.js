import dotnenv from "dotenv";

dotnenv.config();

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017";

export const JWT_SECRET = process.env.JWT_SECRET || "whatever";
console.log({ DB_CONNECTION_STRING, JWT_SECRET });
