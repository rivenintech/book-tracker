import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("book", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  author: text().notNull(),
  read: int({ mode: "boolean" }).notNull().default(false),
});
