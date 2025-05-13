import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bookImage from "../../assets/bg2.webp";
import bgBook from "../../assets/bg.jpg";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [storedUsername, setStoredUsername] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("userEmail", email);
      toast.success("Login Successfully ✅");
      navigate("/home");
    } else {
      setShowModal(true);
    }
  };
  const location = useLocation();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setStoredUsername(savedUsername);
    }
  }, [location]);

  return (
    <div  
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgBook})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <motion.div
        className="relative z-10 flex backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl p-0 rounded-3xl w-full max-w-3xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-1/2 bg-white/10 flex items-center justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img
            src={bookImage}
            alt="Book"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="w-1/2 p-10"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-white text-4xl font-bold text-center mb-8 drop-shadow">
            Welcome
          </h2>
          {storedUsername && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="*******"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black/80 text-white font-semibold py-3 rounded-lg hover:bg-black/60 transition"
              >
                Login
              </button>
            </form>
          )}
          <p className="text-white text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="underline hover:text-gray-200">
              Sign Up
            </a>
          </p>
        </motion.div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-80 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Login Failed
            </h3>
            <p className="text-gray-700">
              Invalid credentials. Please try again.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Login;
