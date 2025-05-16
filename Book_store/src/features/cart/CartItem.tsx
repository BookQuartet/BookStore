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
import { useState } from "react";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import type { PromoCode } from "../../types/bookType";

const Cart = () => {
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState(0);
  const [isPromoClicked, setIsPromoClicked] = useState<boolean>(false);

  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const cartLength = cartItem.length;

  const cartTotal: number = cartItem.reduce(
    (acc, item) =>
      acc + Number(item.price.replace(/[^\d.]/g, "")) * item.quantity,
    0
  );

  const conversionRate = 83;
  const subTotal = Number((cartTotal * conversionRate).toFixed(2));
  const isFreeDelivery = subTotal > 5000;
  const deliveryCharge = isFreeDelivery ? 0 : 50;
  const discountAmount = Number(Math.round(discount).toFixed(2));
  const totalAmount = Math.round(subTotal + deliveryCharge - discount).toFixed(
    2
  );

  const validPromoCodes: Record<string, PromoCode> = {
    SAVE10: { type: "percentage", value: 10 },
    FLAT100: { type: "fixed", value: 100 },
    SAVE50: { type: "percentage", value: 50 },
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (validPromoCodes[code]) {
      const { type, value } = validPromoCodes[code];
      if (type === "percentage") {
        const discountAmount = (subTotal * value) / 100;
        setDiscount(discountAmount);
      } else if (type === "fixed") {
        setDiscount(value);
      }
      toast.success("Promo code applied successfully ✅");
      confetti({
        particleCount: 500,
        spread: 100,
        origin: { y: 0.7 },
      });
      setIsPromoClicked(true);
    } else {
      setDiscount(0);
      toast.error("Invalid promo code ❌");
    }
  };

  const decreaseCartQuantity = (item: string) => {
    dispatch(decreaseQuantity(item));
  };

  const increaseCartQuantity = (item: string) => {
    dispatch(increaseQuantity(item));
  };

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
              const rupeePrice = dollarPrice * conversionRate;

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

          {!isOrdered && cartLength > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-teal-700 mb-2">
                  Apply Promo Code
                </h3>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full p-3 rounded-lg border border-teal-300 focus:outline-none"
                />
                {isPromoClicked && (
                  <span className="text-green-400 text-sm m-2">
                    Promo Code Applied Successfully ❤️‍🔥
                  </span>
                )}
                <button
                  onClick={handleApplyPromo}
                  className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
                >
                  Apply
                </button>
              </div>

              <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-teal-700 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-teal-800">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartLength} item)</span>
                    <span>₹{subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span
                      className={`${
                        isFreeDelivery ? "line-through text-gray-400" : ""
                      }`}
                    >
                      ₹50.00
                    </span>
                  </div>
                  {isFreeDelivery && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span></span>
                      <span>Free Delivery 🎉</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-500"> - ₹{discountAmount}</span>
                  </div>
                  <div className="flex justify-between text-lg mt-2">
                    <span className="font-bold">Total Amount</span>
                    <span>₹{totalAmount}</span>
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
                {isPromoClicked && (
                  <div className="flex mt-4 justify-center bg-green-200 rounded-xl">
                    <img
                      className="w-5 h-5 m-1"
                      src="https://img.icons8.com/ios/50/discount--v1.png"
                      alt=""
                    />
                    <span>
                      You'll save ₹
                      {Math.round(discount + deliveryCharge).toFixed(2)} on this
                      order!
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center mt-10 text-2xl font-semibold text-ellipsis-green-600">
              {isOrdered && cartLength > 0 ? (
                "Order Successfull"
              ) : (
                <span className="text-green-400">Thanks for Shopping 😊</span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
