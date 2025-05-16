import { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { RootState } from "../../store/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../auth/firebaseConfig";

const NavBar = () => {
  const navigate = useNavigate();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const cartLength = cartItem.length;

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName ?? "User");
      } else {
        setUserEmail(null);
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getFirstLetter = (email: string | null | undefined) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="relative h-16 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/book.png"
            alt="Book Icon"
            className="h-6 w-6"
          />
          <span className="text-xl font-bold text-white tracking-wide">
            Book Store
          </span>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4">
          <Link
            to="/home"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white"
          >
            Home <FaHome className="ml-2 mt-1 text-blue-500" />
          </Link>
          <Link
            to="/about"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            About <FaInfoCircle className="ml-2 text-blue-400" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Contact <IoIosCall className="ml-2 text-blue-400" />
          </Link>
          <Link
            to="/booklist"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Book Center <FaInfoCircle className="ml-2 text-blue-400" />
          </Link>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-4">
          <Link to="/cartItem">
            <span className="text-bold text-white">Cart</span>
            <button
              type="button"
              className="relative rounded-full  p-3 text-gray-400 hover:text-white "
            >
              <FaShoppingCart className="text-white relative mt-2 mr-3" />
              {cartLength > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "1px",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    fontSize: "10px",
                  }}
                  className="bg-blue-600 text-white"
                >
                  {cartLength}
                </span>
              )}
            </button>
          </Link>

          <div className="relative">
            {userEmail ? (
              <div
                className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer mr-4"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {getFirstLetter(userEmail)}
              </div>
            ) : (
              <img
                className="h-8 w-8 rounded-full cursor-pointer "
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="User Avatar"
              />
            )}

            {showDropdown && userEmail && (
              <div className="absolute top-10 right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <span>
                    Welcome,{" "}
                    <span className="text-bold text-blue-500">{userName}</span>
                  </span>
                  <br />
                  Signed in as <span className="font-bold">{userEmail}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
