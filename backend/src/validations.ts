import * as v from "valibot";

export const bookSchema = v.object({
  title: v.pipe(v.string("Title must be a string"), v.nonEmpty("Title cannot be empty")),
  author: v.pipe(v.string("Author must be a string"), v.nonEmpty("Author cannot be empty")),
});

export const readStatusSchema = v.object({
  params: v.object({
    id: v.pipe(v.string(), v.transform(Number), v.integer()),
  }),
  body: v.object({
    read: v.boolean("Read status must be a boolean"),
  }),
});
