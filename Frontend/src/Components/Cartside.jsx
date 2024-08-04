// import React, { useContext } from "react";
// import {
//   Drawer,
//   DrawerBody,
//   DrawerHeader,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   Divider,
//   Button,
//   DrawerFooter,
// } from "@chakra-ui/react";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { LoginContext } from "../ContextProvider/LoginProvider";

// const Cartside = ({ originalQuantity }) => {
//   const { cart, setCart } = useContext(LoginContext);
//   const btnRef = React.useRef();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const Token = JSON.parse(localStorage.getItem("Token"));
  
//   const removeFromCart = (productid) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productid));
//   };

//   const updateQuantity = (productid, quantity) => {
//     if (quantity > 0) {
//       setCart((prevCart) =>
//         prevCart.map((item) => {
//           if (item.id === productid) {
//             return { ...item, quantity: quantity };
//           }
//           return item;
//         })
//       );
//     }
//   };

//   const { isloggedin } = useContext(LoginContext);

//   return (
//     <>
//       <div className="relative text-3xl cursor-pointer" ref={btnRef} colorScheme='teal' onClick={onOpen}>
//         <MdOutlineShoppingCart />
//         <div className={`absolute text-sm left-6 bottom-6 font-semibold rounded-full text-white w-5 h-5 text-center ${cart.length === 0 ? "bg-white" : "bg-red-500"}`}>
//           {cart.length > 0 ? cart.length : ""}
//         </div>
//       </div>

//       <Drawer size="md" placement="right" onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen}>
//         <DrawerContent className="pt-5 bg-black">
//           <DrawerCloseButton className="mt-8 text-3xl" />
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="text-2xl font-bold flex justify-start items-center pt-5 pl-5 text-black"
//           >
//             My Cart
//           </motion.div>
//           <Divider className="mt-5 font-bold bg-gray-800" />
//           <DrawerBody className="overflow-y-auto">
//             <div className="cart-container">
//               <ul className="space-y-4">
//                 {cart.length === 0 ? (
//                   <div className="text-center text-gray-500">
//                     No items to show
//                   </div>
//                 ) : (
//                   cart.map((item, index) => (
//                     <li
//                       key={index}
//                       className="flex flex-row  bg-white shadow-md rounded-lg p-4 w-full"
//                     >
//                       <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 ">
//                         <img
//                           className="w-full h-24 sm:w-24 sm:h-24 sm:object-contain rounded-md"
//                           src={item.pic}
//                           alt={item.name}
//                         />
//                       </div>

//                       <div className="flex flex-row sm:flex-row justify-between items-center w-full ">
//                         <div className="flex flex-col  items-center  justify-center
                          
//                         w-full sm:w-auto ">
//                           <div className="text-center sm:text-left mr-3">
//                             <p className="font-semibold text-sm lg:text-xl md:text-xl">name:{item.name}</p>
//                             <p className="text-gray-600">price: ${item.price}</p>
//                           </div>
//                           <div className=" sm:mt-0 sm:ml-4 
//                            w-full
//                           text-center sm:text-left">
//                             <p className="text-gray-700 text-xs lg:text-[0.9rem] md:text-[1rem]">Seller name : {item.sellerinfo.name}</p>
//                             <p className="text-gray-700 lg:text-[0.9rem] md:text-[1rem]">brand : {item.sellerinfo.businessName}</p>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-center mt-4  sm:mt-0">
//                           <div className="flex items-center">
//                             <span className="mr-2">Quantity:</span>
//                             <Button
//                               size="xs"
//                               className="bg-gray-200 hover:bg-gray-300 rounded"
//                               onClick={() => {
//                                 if (item.quantity > 1) {
//                                   updateQuantity(item.id, item.quantity - 1);
//                                 }
//                               }}
//                             >
//                               -
//                             </Button>
//                             <span className="mx-2">{item.quantity}</span>
//                             <Button
//                               size="xs"
//                               className="bg-gray-200 hover:bg-gray-300 rounded"
//                               onClick={() => {
//                                 if (item.quantity < 10) {
//                                   updateQuantity(item.id, item.quantity + 1);
//                                 }
//                               }}
//                             >
//                               +
//                             </Button>
//                           </div>
//                           <Button
//                             className="mt-2 sm:mt-4 bg-red-500 hover:bg-red-600 text-white rounded"
//                             onClick={() => removeFromCart(item.id)}
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       </div>
//                     </li>
//                   ))
//                 )}
//               </ul>
//             </div>
//           </DrawerBody>
//           <DrawerFooter className="flex-col">
//             <Button
//               variant="outline"
//               colorScheme="black"
//               className="w-full mb-2 hover:bg-black hover:text-white"
//               onClick={onClose}
//             >
//               <Link to="/Cart">Go To Cart</Link>
//             </Button>
//             {Token ? (
//               <Button
//                 variant="outline"
//                 colorScheme="black"
//                 className="w-full mb-2 hover:bg-black hover:text-white"
//                 onClick={onClose}
//               >
//                 <Link to="/Checkout"> Checkout</Link>
//               </Button>
//             ) : (
//               <Button
//                 variant="outline"
//                 colorScheme="black"
//                 className="w-full mb-2 hover:bg-black hover:text-white"
//               >
//                 <Link to="/Login">Login</Link>
//               </Button>
//             )}
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };

// export default Cartside;

// // sm:items-start sm:space-x-2 

import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  Button,
  DrawerFooter,
  DrawerOverlay,
} from "@chakra-ui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginContext } from "../ContextProvider/LoginProvider";

const Cartside = () => {
  const { cart, setCart } = useContext(LoginContext);
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Token = JSON.parse(localStorage.getItem("Token"));

  const removeFromCart = (productid) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productid));
  };

  const updateQuantity = (productid, quantity) => {
    if (quantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === productid) {
            return { ...item, quantity: quantity };
          }
          return item;
        })
      );
    }
  };

  const { isloggedin } = useContext(LoginContext);

  return (
    <>
      <div
        className="relative text-3xl cursor-pointer"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        <MdOutlineShoppingCart />
        <div
          className={`absolute text-sm left-6 bottom-6 font-semibold rounded-full text-white w-5 h-5 text-center ${
            cart.length === 0 ? "bg-white" : "bg-red-500"
          }`}
        >
          {cart.length > 0 ? cart.length : ""}
        </div>
      </div>

      <Drawer
        size="md"
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
      >
        <DrawerOverlay
          className="backdrop-blur"
          sx={{ backdropFilter: "blur(2px)" }}
        />
        <DrawerContent className="pt-5 bg-black">
          <DrawerCloseButton className="mt-8 text-3xl" />
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl font-bold flex justify-start items-center pt-5 pl-5 text-black"
          >
            My Cart
          </motion.div>
          <Divider className="mt-5 font-bold bg-gray-800" />
          <DrawerBody className="overflow-y-auto">
            <div className="cart-container">
              <ul className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No items to show
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-row bg-white shadow-md rounded-lg p-4 w-full"
                    >
                      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <img
                          className="w-full h-24 sm:w-24 sm:h-24 sm:object-contain rounded-md"
                          src={item.pic}
                          alt={item.name}
                        />
                      </div>

                      <div className="flex flex-row sm:flex-row justify-between items-center w-full">
                        <div className="flex flex-col items-center justify-center w-full sm:w-auto">
                          <div className="text-center sm:text-left mr-3">
                            <p className="font-semibold text-sm lg:text-xl md:text-xl">
                              name: {item.name}
                            </p>
                            <p className="text-gray-600">
                              price: ${item.price}
                            </p>
                          </div>
                          <div className="sm:mt-0 sm:ml-4 w-full text-center sm:text-left">
                            <p className="text-gray-700 text-xs lg:text-[0.9rem] md:text-[1rem]">
                              Seller name: {item.sellerinfo.name}
                            </p>
                            <p className="text-gray-700 lg:text-[0.9rem] md:text-[1rem]">
                              brand: {item.sellerinfo.businessName}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center mt-4 sm:mt-0">
                          <div className="flex items-center">
                            <span className="mr-2">Quantity:</span>
                            <Button
                              size="xs"
                              className="bg-gray-200 hover:bg-gray-300 rounded"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              size="xs"
                              className="bg-gray-200 hover:bg-gray-300 rounded"
                              onClick={() => {
                                if (item.quantity < 10) {
                                  updateQuantity(item.id, item.quantity + 1);
                                }
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            className="mt-2 sm:mt-4 bg-red-500 hover:bg-red-600 text-white rounded"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </DrawerBody>
          <DrawerFooter className="flex-col">
            <Button
              variant="outline"
              colorScheme="black"
              className="w-full mb-2 hover:bg-black hover:text-white"
              onClick={onClose}
            >
              <Link to="/Cart">Go To Cart</Link>
            </Button>
            {Token ? (
              <Button
                variant="outline"
                colorScheme="black"
                className="w-full mb-2 hover:bg-black hover:text-white"
                onClick={onClose}
              >
                <Link to="/Checkout"> Checkout</Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="black"
                className="w-full mb-2 hover:bg-black hover:text-white"
              >
                <Link to="/Login">Login</Link>
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cartside;
