import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../../components/common/NavBar";
import HomeSlidding from "../../components/home/HomeSlidding";

export default function FreeBookHome() {
  const navigate = useNavigate();
  const { books, isLoading, skeletonCount } = useFetch(
    "https://api.itbook.store/1.0/new"
  );

  const SkeletonLayout = () => {
    return (
      <div className="w-[350px] min-h-[500px] flex  flex-col border border-gray-300 rounded-lg shadow bg-white p-4 animate-pulse">
        <div className="h-8 bg-gray-300 rounded mb-4"></div>

        <div className="w-full h-[250px] bg-gray-300 rounded mb-4"></div>

        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-2/4 mb-2"></div>

        <div className="mt-auto h-10 bg-gray-300 rounded w-full"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-white ">
      <NavBar />

      <div className="px-2  mt-24">
        <HomeSlidding />
      </div>
      <h1 className="text-xl font-bold font-serif bg-gray-500 text-white rounded-lg px-2 shadow-lg my-[30px] text-center">
        Free Books - Choose Any You Like !! and Enjoy
      </h1>
      <motion.div
        layout
        className="flex flex-wrap justify-between items-center gap-3"
      >
        {isLoading
          ? Array.from({ length: skeletonCount }, (_, i) => (
              <SkeletonLayout key={i} />
            ))
          : books.map((item) => (
              <motion.div
                layout
                layoutId={item.isbn13}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                key={item.isbn13}
                className="w-[22%] min-h-[500px] flex flex-col border border-gray-300 rounded-lg shadow  mx-4 bg-white hover:translate-y-1 transition-transform duration-300"
              >
                <h3 className="font-semibold text-base bg-yellow-300 text-gray-900 text-center px-2 py-3 rounded-t-lg">
                  {item.title}
                </h3>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full  object-contain bg-gray-200"
                />
                <div className="p-3 text-sm space-y-2 flex-1">
                  {item.subtitle.trim() ? (
                    <p className="font-medium">
                      <span className="text-gray-700">Subtitle:</span>{" "}
                      {item.subtitle}
                    </p>
                  ) : (
                    <p className="font-medium">
                      <span className="text-gray-700">Subtitle:</span>{" "}
                      {item.title}
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-gray-700">Price:</span>{" "}
                    <span className="text-green-600">{item.price}</span>
                  </p>
                </div>
                <div className="px-3 pb-4 mt-auto">
                  <button
                    onClick={() => navigate(`/book-details/${item.isbn13}`)}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  >
                    View Full Book
                  </button>
                </div>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}
