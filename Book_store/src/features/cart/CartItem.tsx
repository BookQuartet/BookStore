import { FaOpencart } from "react-icons/fa6";
const Cart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-teal-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold text-teal-700 mb-8">
        <span>Shopping Cart</span>
          <FaOpencart className="text-5xl text-teal-600" />
        </h1>

        <div className="space-y-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:justify-between bg-teal-50 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <h2 className="text-lg font-semibold text-teal-800">Product Name</h2>
                  <p className="text-sm text-teal-600">₹999.00</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="flex items-center gap-2">
                  <button className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full">−</button>
                  <span className="text-teal-800 font-medium">1</span>
                  <button className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full">+</button>
                </div>
                <button className="text-red-500 hover:underline text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-teal-200 my-8"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-teal-700 mb-2">Apply Promo Code</h3>
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
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Order Summary</h3>
            <div className="space-y-2 text-teal-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹2997.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹50.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>₹3047.00</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl text-lg hover:bg-teal-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
