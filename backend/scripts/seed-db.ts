import { faker } from "@faker-js/faker";
import { db } from "../src/db/client";
import { books } from "../src/db/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Delete existing books
  await db.delete(books).execute();

  const NUM_BOOKS = 30;

  for (let i = 0; i < NUM_BOOKS; i++) {
    await db.insert(books).values({
      title: faker.book.title(),
      author: faker.book.author(),
      read: faker.datatype.boolean(0.2),
    });
  }

  console.log(`✅ Inserted ${NUM_BOOKS} books`);
}

seed()
  .then(() => {
    console.log("🌱 Done!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
