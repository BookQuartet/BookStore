import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

interface Category {
  name: string;
  keyword: string;
}

const categories: Category[] = [
  { name: "All", keyword: "" },
  { name: "JavaScript", keyword: "javascript" },
  { name: "Python", keyword: "python" },
  { name: "PHP", keyword: "php" },
  { name: "Node", keyword: "node" },
  { name: "React", keyword: "react" },
];

const BookList: React.FC = () => {
  const [query, setQuery] = useState<string>("programming");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    axios
      .get(`https://api.itbook.store/1.0/search/${query}`)
      .then((res) => {
        setBooks(res.data.books || []);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
      });
  }, [query]);

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat.name);
    setQuery(cat.keyword || "programming");
  };

  const filteredBooks = books.filter((book) =>
    selectedCategory === "All"
      ? true
      : book.title
          .toLowerCase()
          .includes(
            categories.find((c) => c.name === selectedCategory)?.keyword || ""
          )
  );

  return (
    <div className="flex p-6">
      <div className="w-60 mr-8">
        <h3 className="text-lg font-semibold mb-4">Filter By Category</h3>
        <div className="border-t border-gray-300 pt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="border border-gray-300 px-3 py-2 w-[250px] mb-3"
          />
          <h4 className="font-medium text-xl mb-3">Category</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className={`cursor-pointer ${
                  selectedCategory === cat.name
                    ? "font-bold text-black"
                    : "text-gray-700"
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main>
        <div className="flex justify-between flex-wrap items-center">
          {filteredBooks.map((book) => (
            <div
              key={book.isbn13}
              className="w-[200px] justify-center shadow-2xl rounded p-3 m-2 flex flex-col items-center"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-[100px] h-[130px] object-cover mb-2"
              />
              <h4 className="text-sm font-semibold text-center mb-1">
                {book.title}
              </h4>
              <p className="text-xs text-gray-500 text-center mb-1">
                {book.subtitle}
              </p>
              <p className="text-sm font-bold">{book.price}</p>
              <div className="flex gap-3 mt-2">
                <button className="bg-blue-500 px-1 py-1 rounded-md text-sm">
                  Add to cart
                </button>
                <button className="bg-orange-500 px-1 py-1 rounded-md text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookList;
