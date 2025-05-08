import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/home/HomePage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../components/login/Login";
import Cart from "../features/cart/CartItem";
import BookList from "../features/book/BookList";
import Footer from "../components/common/Footer";
import Register from "../components/login/Register";
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cartItem" element={<Cart />} />
          <Route path="/booklist" element={<BookList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
