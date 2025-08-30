"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const bookSchema = v.object({
  title: v.pipe(v.string("Title must be a string"), v.nonEmpty("Title cannot be empty")),
  author: v.pipe(v.string("Author must be a string"), v.nonEmpty("Author cannot be empty")),
});

export default function AddBookBtn({ onSubmit }: { onSubmit: (values: v.InferOutput<typeof bookSchema>) => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm<v.InferOutput<typeof bookSchema>>({
    resolver: valibotResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const submitBook = (values: v.InferOutput<typeof bookSchema>) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitBook)} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Add Book</DialogTitle>
              <DialogDescription>Add a new book to your collection.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter book title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Book</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
