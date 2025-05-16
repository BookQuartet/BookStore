import { motion } from "framer-motion";
import NavBar from "../components/common/NavBar";
import emailjs from "@emailjs/browser";
import Book from "../assets/Book.jpg";
import { useRef } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_4dd9v37",
        "template_hsvkdpm",
        form.current,
        "fjp_OKCtmcrVNHMum"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Email sent successfully!", {
            position: "top-center",
            autoClose: 3000,
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error(`Failed to send email: ${error.text}`, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      );

    e.currentTarget.reset();
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-amber-100 to-white flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-lg p-8">
          <motion.div
            className="flex flex-col justify-center items-center text-center p-6"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={Book}
              alt="Book illustration"
              className="w-72 md:w-[400px] rounded-2xl shadow-lg mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
            />
            <h1 className="text-4xl font-bold text-blue-900 mb-3">
              Book Store
            </h1>
            <p className="text-gray-700 max-w-md">
              Discover a world of imagination and knowledge. Get in touch with
              us for your queries or suggestions!
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-inner"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
              Contact Us
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="to_name"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="relative">
                <textarea
                  rows={4}
                  required
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
