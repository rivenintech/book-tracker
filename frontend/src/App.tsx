import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Loader2 } from "lucide-react";
import bookCover from "./assets/book.svg";
import AddBookBtn from "./components/add-book-btn";
import BookCard from "./components/book";

type Book = {
  id: number;
  title: string;
  author: string;
  read: boolean;
};

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/books");
      return (await response.json()) as Promise<Book[]>;
    },
  });

  const updateReadStatus = useMutation({
    mutationFn: async (updatedBook: { id: number; read: boolean }) => {
      const response = await fetch(`http://localhost:3000/api/books/${updatedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: updatedBook.read }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update book: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const submitNewBook = useMutation({
    mutationFn: async (newBook: { title: string; author: string }) => {
      const response = await fetch(`http://localhost:3000/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error(`Failed to add book: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <header>
        <div>
          <div className="items-bottom flex gap-2">
            <BookOpen size={30} className="self-baseline-last" />
            <h1 className="text-2xl font-bold">Book Tracker</h1>
          </div>
          <p className="text-sm text-gray-500">Keep track of your reading list and manage your books effortlessly.</p>
        </div>
        <div className="my-6 flex justify-end">
          <AddBookBtn onSubmit={(newBook) => submitNewBook.mutate(newBook)} />
        </div>
      </header>
      <main>
        {isLoading && (
          <Loader2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform animate-spin" />
        )}
        {data && (
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {data.map((book) => (
              <li key={book.id} className="text-center">
                <BookCard
                  bookData={{ ...book, bookCover }}
                  onToggleRead={() => updateReadStatus.mutate({ id: book.id, read: !book.read })}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
