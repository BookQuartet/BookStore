const Login = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
         style={{ backgroundImage: "url('https://wallpaperaccess.com/full/5487851.jpg')" }}>
      
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-white text-4xl font-bold text-center mb-8 drop-shadow">
          Welcome
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black/80 text-white font-semibold py-3 rounded-lg hover:bg-black/60 transition"
          >
            Login
          </button>

          <p className="text-white text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="#" className="underline hover:text-gray-200">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
