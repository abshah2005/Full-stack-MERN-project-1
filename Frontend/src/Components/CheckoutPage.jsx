import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../ContextProvider/LoginProvider";
import Loader from "../Components/Loader";

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    permanentAddress: "",
    shippingAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const orderPreviewRef = useRef(null);
  const containerRef = useRef(null);

  // Use context at the top level of the component
  const { cart, setCart } = useContext(LoginContext);

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  
  

  const User = JSON.parse(localStorage.getItem("User"));
  const id = User?._id; 

  const Token=JSON.parse(localStorage.getItem("Token"));

  if (!id) {
    alert("Login in first please ");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const total = cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

      const orderData = {
        user: id,
        orders: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          pic: item.pic,
          SellerId:item.sellerinfo._id
        })),
        total,
        status: "Pending",
        paymentMethod: "Cash on Delivery",
        userinfo: userInfo,
      };
      console.log(orderData);

      const response = await axios.post("/orders/postorder", orderData,{
        headers:{
          Authorization:`Bearer ${Token}`
        }
      });
      if (response.status === 201) {
        console.log("Order Placed Successfully", response.data);
      }
      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed Successfully");
    } catch (error) {
      console.error("Error placing order", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex  h-auto justify-center bg-gray-100 "
    >
      {isLoading && (
        <>
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 z-40" />
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <Loader />
          </div>
        </>
      )}

      <div className="flex  w-full p-4 flex-col-reverse sm:flex-row">
        <div className="w-full md:w-1/2 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <form onSubmit={handleSubmit}>
            
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="name"
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleUserInfoChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="email"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="phone"
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="country"
                  type="text"
                  name="country"
                  value={userInfo.country}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="city"
                  type="text"
                  name="city"
                  value={userInfo.city}
                  onChange={handleUserInfoChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="address"
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={userInfo.postalCode}
                  onChange={handleUserInfoChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="permanentAddress"
                >
                  Permanent Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="permanentAddress"
                  type="text"
                  name="permanentAddress"
                  value={userInfo.permanentAddress}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shippingAddress"
                >
                  Shipping Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  required
                  id="shippingAddress"
                  type="text"
                  name="shippingAddress"
                  value={userInfo.shippingAddress}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 p-0 lg:p-4 md:p-4 bg-white rounded shadow-md ml-0 lg:ml-4 md:ml-4 mb-2 md:mb-0 lg:mb-0">
          <h3 className="text-2xl font-bold mb-4 p-2">Order Preview</h3>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center p-2">
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={item.pic}
                    alt={item.name}
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center pr-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h4 className="font-bold">Total Amount:</h4>
            <p className="text-lg">
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
