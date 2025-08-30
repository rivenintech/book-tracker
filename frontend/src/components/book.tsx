import { CheckCircle, Circle } from "lucide-react";

type BookProps = {
  bookData: { id: number; title: string; author: string; read: boolean; bookCover: string };
  onToggleRead: () => void;
};

export default function BookCard({ bookData, onToggleRead }: BookProps) {
  return (
    <>
      <div className="relative">
        <img
          src={bookData.bookCover}
          alt={`${bookData.title} cover`}
          width={200}
          height={300}
          className="size-full object-cover"
        />
        <button
          title={bookData.read ? "Mark as unread" : "Mark as read"}
          type="button"
          onClick={onToggleRead}
          className="absolute right-2 top-2"
        >
          {bookData.read ? <CheckCircle className="text-green-500" /> : <Circle className="text-gray-500" />}
        </button>
      </div>
      <p className="font-semibold">{bookData.title}</p>
      <p className="text-sm text-gray-500">{bookData.author}</p>
    </>
  );
}
