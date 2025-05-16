import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../components/login/Login";
import Cart from "../features/cart/CartItem";
import BookList from "../features/book/BookList";
import Register from "../components/login/Register";
import BookDetails from "../features/book/BookDetails";
import FreeBookHome from "../features/book/FreeBookHome";
import Footer from "../components/common/Footer";
import NotFound from "../pages/NotFound";
import ScrollToTop from "../components/common/ScrollToTop";
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cartItem" element={<Cart />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/book-details/:isbn13" element={<BookDetails />} />
          <Route path="/home" element={<FreeBookHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
