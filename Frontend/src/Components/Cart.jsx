import React, { useContext } from "react";
import { FaChevronRight, FaChevronLeft, FaCross } from "react-icons/fa";
import { LoginContext } from "../ContextProvider/LoginProvider";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import {
  Button,
  Checkbox,
  Divider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { BsTrash, BsTrash2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(LoginContext);
  const Token = JSON.parse(localStorage.getItem("Token"));
  const toast = useToast();
  const removeFromCart = (productid) => {
    setCart((prevCart) => prevCart.filter((item) => item.id != productid));
  };
  const updateQuantity = (productid, quantity) => {
    if (quantity > 0) {
      setCart((prevcart) =>
        prevcart.map((item) => {
          if (item.id === productid) {
            return { ...item, quantity: quantity };
          }
          return item;
        })
      );
    }
  };
  return (
    <div className="pt-20 w-full min-h-screen ">
      <div className="bg-[#f1f2f4] w-full h-16 flex ">
        <p className=" pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center">
          {" "}
          <span className="font-bold">Home</span> <FaChevronRight />{" "}
          <span>Cart</span>
        </p>
      </div>

      <div className="w-full">
        <p className="text-6xl font-bold text-[#2d2d2d] w-full text-center pt-8 pb-8 lg:pb-0 md:pb-0">
          {" "}
          Your Cart{" "}
        </p>

        <div>
          <div className=" justify-around items-center pt-10 pb-4 hidden lg:flex md:flex">
            <div className="w-[30%]"></div>
            <div className="w-[60%] flex justify-between">
              <div className="text-[#2d2d2d] font-semibold text-2xl   ">
                {" "}
                <p>Quantity</p>
              </div>
              <div className="text-[#2d2d2d] font-semibold text-2xl ">
                <p className="pr-12">Total</p>
              </div>
            </div>
          </div>

          <section className="w-[90%] m-auto  products-section">
            <hr />
            <div className="pt-5 pb-5 min-h-40">
              {cart.length === 0 ? (
                <div className="flex justify-center items-center ">
                  <p className="text-center pt-10 text-2xl font-bold opacity-50">
                    Your Cart is Empty
                  </p>
                  <div className="text-4xl pt-10 opacity-30">
                    <BsTrash />
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="flex justify-between pt-5 pb-5 ">
                    <div className="w-40 h-40">
                      <img
                        className="w-full h-full object-contain rounded-md"
                        src={item.pic}
                        alt=""
                      />
                    </div>
                    <div className="w-[40%] pl-0 lg:pl-5 md:pl-5">
                      <p className="font-bold text-xl">{item.name}</p>
                      <p className=" text-gray-600">color : {item.color}</p>
                      <div className="quantity-counter flex items-center">
                        <p>Quantity :</p>
                        <button
                          className=" w-9 h-9 text-xl flex justify-center items-center text-black"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                        >
                          <FiMinusCircle />
                        </button>
                        <span className="text-title font-black text-xl text-black">
                          {item.quantity}
                        </span>
                        <button
                          className=" w-9 text-xl h-9 flex justify-center items-center text-black"
                          onClick={() => {
                            if (item.quantity < 10) {
                              updateQuantity(item.id, item.quantity + 1);
                            }
                          }}
                        >
                          <FiPlusCircle />
                        </button>
                      </div>
                    </div>
                    <div className="flex ">
                      <p className="text-black">
                        ${item.price * item.quantity}
                      </p>
                      <div
                        className="pt-0 pl-2 text-2xl font-bold cursor-pointer"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast({
                            title: "Item Removed From Cart",
                            status: "success",
                            duration: 2000,
                          });
                        }}
                      >
                        <IoMdClose />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Divider />
          </section>
        </div>
      </div>
      {/* <div className="w-[95%] min-h-[30vh] flex justify-end pt-10">

         <div className="w-[50%]">
         <Textarea />
         <div>
            <p>Subtotal</p>
            <p>${cart.reduce((total,item)=>total+item.price *item.quantity,0)}</p>
         </div>
         <div className="flex justify-center items-center">
            <Checkbox /> <p>I accept all the Terms and Condition</p>
         </div>
         <div>
            <Button variant="outline"
                colorScheme="black"
                className="w-full mb-2 hover:bg-black hover:text-white">
                CheckOut
            </Button>
         </div>

         </div>
      </div> */}

      <div className="w-full min-h-[30vh] flex justify-end pt-10 px-4">
        <div className="w-full md:w-[50%] bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <Textarea
              placeholder="Add any notes for your order..."
              className="w-full"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Subtotal</p>
            <p className="text-lg font-semibold">
              $
              {cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
            </p>
          </div>
          <div className="flex items-center  mb-4">
            <Checkbox colorScheme="black" className="mr-2" />
            <p>I accept all the Terms and Conditions</p>
          </div>
          {/* <Link> */}

          <Link to={"/Checkout"} className="w-full flex justify-center">
            <Button
              variant="outline"
              colorScheme="black"
              className="w-full lg:w-1/2 md:w-1/2 hover:bg-black hover:text-white transition-all duration-300"
            >
              Check Out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
