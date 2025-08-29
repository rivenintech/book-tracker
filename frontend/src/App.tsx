import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import bookCover from "./assets/book.svg";

type Book = {
  id: number;
  title: string;
  author: string;
  read: boolean;
};

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/books");
      return (await response.json()) as Promise<Book[]>;
    },
  });

  return (
    <div className="container mx-auto p-4">
      {isLoading && (
        <Loader2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform animate-spin" />
      )}
      {data && (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((book) => (
            <li key={book.id} className="text-center">
              <div className="relative mx-auto w-fit">
                <img src={bookCover} alt={`${book.title} cover`} width={200} height={300} />
              </div>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-gray-500">{book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
