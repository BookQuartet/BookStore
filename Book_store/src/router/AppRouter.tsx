import { BrowserRouter, Routes ,Route} from "react-router-dom"
import HomePage from "../components/home/HomePage"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../components/login/Login"
import Cart from "../features/cart/CartItem"
const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
        </BrowserRouter> 
    </div>
  )
}

export default AppRouter