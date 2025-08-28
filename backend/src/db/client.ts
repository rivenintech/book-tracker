import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as dbSchema from "./schema";

export const db = drizzle({
  connection: process.env.DB_FILE_NAME!,
  casing: "snake_case",
  schema: dbSchema,
});
