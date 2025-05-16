import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
const App: React.FC = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppRouter />
    </div>
  );
};

export default App;
