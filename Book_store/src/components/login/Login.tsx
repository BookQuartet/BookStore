import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bookImage from "../../assets/bg2.webp";
import bgBook from "../../assets/bg.jpg";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebaseConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        toast.success("Logged in successfully");
        navigate("/home");
      }, 1000);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {error && (
              <motion.div
                className="text-red-500 text-center font-bold text-xl mt-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p>{error.replace("Firebase: ", "").replace("auth/", "")}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-black/80 hover:bg-black/60"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Please Wait...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

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
