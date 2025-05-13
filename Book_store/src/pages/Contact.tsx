import NavBar from "../components/common/NavBar";
import Book from "../assets/Book.jpg";
const Contact = () => {
  return (
    <>
      <NavBar />
      <div>
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-amber-100 to-yellow-50">
          <div className="md:w-1/2 p-10 flex flex-col justify-center items-center text-center bg-blue-200 shadow-inner">
            <h1 className="text-4xl font-bold text-brown-900 mb-4">
              Book Store
            </h1>
            <p className="text-brown-700 max-w-md mb-6">
              Step into a world of stories. Reach out to us anytime!
            </p>
            <img
              src={Book}
              alt="Book illustration"
              className="w-[600px] animate-pulse rounded-3xl"
            />
          </div>

          <div className="md:w-1/2 p-10 flex flex-col  justify-center bg-white">
            <h2 className="text-3xl font-semibold mb-6 text-center text-brown-800 ">
              Contact Us
            </h2>
            <form className="space-y-6 max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  required
                  className="peer w-full border-b-2 border-gray-300 focus:border-amber-500 outline-none bg-transparent py-2"
                />
                <label className="absolute left-0 top-2 text-gray-500 peer-focus:top-[-1rem] peer-focus:text-sm peer-focus:text-amber-600 transition-all">
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="peer w-full border-b-2 border-gray-300 focus:border-amber-500 outline-none bg-transparent py-2"
                />
                <label className="absolute left-0 top-2 text-gray-500 peer-focus:top-[-1rem] peer-focus:text-sm peer-focus:text-amber-600 transition-all">
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  rows={4}
                  required
                  className="peer w-full border-b-2 border-gray-300 focus:border-amber-500 outline-none bg-transparent py-2 resize-none"
                ></textarea>
                <label className="absolute left-0 top-2 text-gray-500 peer-focus:top-[-1rem] peer-focus:text-sm peer-focus:text-amber-600 transition-all">
                  Message
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
