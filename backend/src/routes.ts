import { eq } from "drizzle-orm";
import { Router } from "express";
import * as v from "valibot";
import { db } from "./db/client";
import { books } from "./db/schema";
import { bookSchema, readStatusSchema } from "./validations";

const router = Router();

// Get all books
router.get("/", async (req, res) => {
  const booksList = await db.query.books.findMany({
	orderBy: (book, { desc }) => [desc(book.id)],
});
  res.json(booksList);
});

// Add new book
router.post("/", async (req, res) => {
  const parsedBookData = v.safeParse(bookSchema, req.body);

  if (!parsedBookData.success) {
    return res.status(400).json({
      message: "Invalid book data",
      errors: v.flatten<typeof bookSchema>(parsedBookData.issues),
    });
  }

  const newBook = await db.insert(books).values(parsedBookData.output).returning();
  res.status(201).json({ message: "Book added successfully", book: newBook });
});

// Update read status
router.put("/:id", async (req, res) => {
  const parsedReadStatus = v.safeParse(readStatusSchema, { params: req.params, body: req.body });

  if (!parsedReadStatus.success) {
    return res.status(400).json({
      message: "Invalid read status",
      errors: v.flatten<typeof readStatusSchema>(parsedReadStatus.issues),
    });
  }

  const { body, params } = parsedReadStatus.output;

  const updatedId = await db
    .update(books)
    .set({ read: body.read })
    .where(eq(books.id, params.id))
    .returning({ updatedId: books.id });

  // Check if the book was found and updated
  if (updatedId.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ message: "Book read status updated successfully" });
});

export default router;
