import { FaOpencart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  buyItem,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import { useState } from "react";

const Cart = () => {
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  console.log(cartItem);
  const cartTotal: number = cartItem.reduce(
    (acc, item) =>
      acc + Number(item.price.replace(/[^\d.]/g, "")) * item.quantity,
    0
  );
  const decreaseCartQuantity = (item: any) => {
    dispatch(decreaseQuantity(item));
  };
  const increaseCartQuantity = (item: any) => {
    console.log(item);
    dispatch(increaseQuantity(item));
  };
  const conversionRate = 83;
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-teal-100 p-6 mt-[80px]">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
          <h1 className="flex items-center justify-center gap-3 text-4xl font-bold text-teal-700 mb-8">
            <span>Shopping Cart</span>
            <FaOpencart className="text-5xl text-teal-600" />
          </h1>

          <div className="space-y-6">
            {cartItem.map((item, index) => {
              const dollarPrice = Number(
                item.price.toString().replace(/[^\d.]/g, "")
              );
              const rupeePrice = dollarPrice * conversionRate * item.quantity;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center sm:justify-between bg-teal-50 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-teal-800">
                        {item.title}
                      </h2>
                      <p className="text-sm text-teal-600">
                        ₹{rupeePrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseCartQuantity(item.id)}
                        className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full"
                      >
                        -
                      </button>
                      <span className="text-teal-800 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseCartQuantity(item.id)}
                        className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-teal-200 my-8"></div>

          {!isOrdered ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-teal-700 mb-2">
                  Apply Promo Code
                </h3>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full p-3 rounded-lg border border-teal-300 focus:outline-none"
                />
                <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition">
                  Apply
                </button>
              </div>

              <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-teal-700 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-teal-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      ₹{Math.round(cartTotal * conversionRate).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹50.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>
                      ₹{Math.round(cartTotal * conversionRate + 50).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(buyItem());
                    setIsOrdered(true);
                  }}
                  className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl text-lg hover:bg-teal-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-10 text-2xl font-semibold text-green-600">
              🎉 Order Successful!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Cart;
