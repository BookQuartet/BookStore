import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgBook from "../../assets/bg.jpg";
import { toast } from "react-toastify";
import { auth } from "../../auth/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (password !== confirmPassword)
    //   return toast.error("Passwords do not match");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      toast.success("Registered successfully");
      navigate("/");
    } catch (error: any) {
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
        className="relative z-10 backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl p-10 rounded-3xl w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-white text-4xl font-bold text-center mb-8 drop-shadow">
          Register
        </h2>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div>
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              placeholder="Name"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Example:Name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="*********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="w-full bg-black/80 text-white font-semibold py-3 rounded-lg hover:bg-black/60 transition"
          >
            Register
          </button>
        </motion.form>
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
              Registration Failed
            </h3>
            <p className="text-gray-700">
              Passwords do not match. Please try again.
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
export default Register;
