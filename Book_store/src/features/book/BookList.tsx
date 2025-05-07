import React, { useState, type JSX } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import useFetch from "../../hooks/useFetch";
import { motion } from "framer-motion";

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
  icon: string;
}

const categories: Category[] = [
  { name: "All", keyword: "", icon: "https://s2.svgbox.net/hero-outline.svg?ic=code" },
  {
    name: "JavaScript",
    keyword: "javascript",
    icon: "https://s2.svgbox.net/files.svg?ic=java",
  },
  {
    name: "Python",
    keyword: "python",
    icon: "https://s2.svgbox.net/files.svg?ic=python",
  },
  {
    name: "PHP",
    keyword: "php",
    icon: "https://s2.svgbox.net/files.svg?ic=php",
  },
  {
    name: "Node",
    keyword: "node",
    icon: "https://s2.svgbox.net/files.svg?ic=node",
  },
  {
    name: "React",
    keyword: "react",
    icon: "https://s2.svgbox.net/files.svg?ic=reactjs",
  },
  {
    name: "MongoDB",
    keyword: "mongodb",
    icon: "https://s2.svgbox.net/files.svg?ic=mongo",
  },
  {
    name: "Java",
    keyword: "java",
    icon: "https://s2.svgbox.net/files.svg?ic=java",
  },
  { name: "Go", keyword: "go", icon: "https://s2.svgbox.net/files.svg?ic=go" },
  {
    name: "Kotlin",
    keyword: "kotlin",
    icon: "https://s2.svgbox.net/files.svg?ic=kotlin",
  },
  {
    name: "Android",
    keyword: "android",
    icon: "https://s2.svgbox.net/materialui.svg?ic=android",
  },
  {
    name: "Angular",
    keyword: "angular",
    icon: "https://s2.svgbox.net/files.svg?ic=angular",
  },
];
const SkeletonBookCard = () => (
  <div className="w-[200px] shadow-2xl rounded p-3 m-2 animate-pulse">
    <div className="w-[100px] h-[130px] bg-gray-300 mb-2 mx-auto rounded" />
    <div className="h-4 bg-gray-300 mb-1 w-3/4 mx-auto rounded" />
    <div className="h-3 bg-gray-300 mb-1 w-2/4 mx-auto rounded" />
    <div className="h-4 bg-gray-300 w-1/4 mx-auto rounded" />
  </div>
);
const convertToINR = (usdString: string): string => {
  const numericValue = parseFloat(usdString.replace(/[^0-9.]/g, ""));
  return `₹ ${Math.round(numericValue * 85).toLocaleString("en-IN")}`;
};
const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>("programming");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { books, isLoading, skeletonCount } = useFetch(
    `https://api.itbook.store/1.0/search/${query}`
  );

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
  const handleAddToCart = (book: Book) => {
    dispatch(
      addToCart({
        id: book.isbn13,
        title: book.title,
        price: book.price,
        quantity: 1,
        image: book.image,
      })
    );
  };

  return (
    <div className="flex p-6">
      <div className="w-60 mr-8">
        <h3 className="text-lg font-semibold mb-4">Filter By Category</h3>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books..."
              className="border border-gray-300 px-3 py-2 w-[250px] mb-3 relative"
            />
            <img
              className="absolute w-5 h-5 right-[83%] top-[13%]"
              src="https://s2.svgbox.net/hero-outline.svg?ic=search"
              alt=""
            />
          </div>
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
                <div className="flex">
                  <img src={cat.icon} className="w-5 h-5 mr-2" alt="" />
                  <span> {cat.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main>
        <motion.div
          layout
          className="flex justify-between flex-wrap items-center gap-4"
        >
          {isLoading
            ? Array.from({ length: skeletonCount }, (_, i) => (
                <SkeletonBookCard key={i} />
              ))
            : filteredBooks.map((book) => (
                <motion.div
                  key={book.isbn13}
                  layout
                  layoutId={book.isbn13}
                  className="w-[200px] justify-center shadow-2xl rounded p-3 m-2 flex flex-col items-center bg-white"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
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
                  <p className="text-sm font-bold">
                    {convertToINR(book.price)}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Add to Cart
                    </button>
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-orange-500 text-white px-2 py-1 rounded text-sm"
                    >
                      View
                    </a>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </main>
    </div>
  );
};

export default BookList;
