import React, { useContext, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import ReactSlick from "./ReactSlick";
import { Link } from "react-router-dom";
import { LoginContext } from "../ContextProvider/LoginProvider";

const Productside = ({
  name,
  pics,
  description,
  price,
  id,
  color,
  src,
  sellerinfo,
  instock
}) => {
  const toast = useToast();
  const { addToCart } = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={onOpen}>
        <FaSearch className="text-xl text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out" />
      </div>
      <Drawer size="md" placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerContent className="drawer-content pt-5 bg-white shadow-xl">
          <DrawerCloseButton className="mt-8 text-3xl text-gray-800" />
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="drawer-header text-2xl font-bold flex justify-start items-center pt-5 pl-5 text-gray-800"
          >
            Product Review
          </motion.div>
          <Divider className="mt-5 bg-gray-300" />
          <DrawerBody>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-4">
                <ReactSlick pics={pics} />
              </div>
              <div className="w-full lg:w-1/2 p-4 space-y-4">
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-xl font-bold text-green-600">${price}</p>
                <p className="text-gray-600">{description}</p>
                <p className="text-black">Color: {color}</p>
                <div className="quantity-counter flex items-center">
                  <p>Quantity :</p>
                  <button
                    className=" w-9 h-9 text-xl flex justify-center items-center text-black"
                    onClick={handleDecrement}
                  >
                    <FiMinusCircle />
                  </button>
                  <span className="text-title font-black text-xl text-black">
                    {quantity}
                  </span>
                  <button
                    className=" w-9 text-xl h-9 flex justify-center items-center text-black"
                    onClick={handleIncrement}
                  >
                    <FiPlusCircle />
                  </button>
                </div>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <div className="w-full">
              {
                instock?(<Button
                  variant="outline"
                  colorScheme="black"
                  className="w-full mb-2 hover:bg-black hover:text-white"
                  onClick={() => {
                    addToCart({
                      name: name,
                      price: price,
                      pic: src,
                      sellerinfo: sellerinfo,
                      id: id,
                      color: color,
                      quantity: quantity,
                    });
  
                    toast({
                      title: "Product Added!",
                      description: "Product successfully added to cart",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }}
                >
                  Add To Cart
                </Button>):(
                  <Button
                  variant="outline"
                  colorScheme="black"
                  className="w-full mb-2 hover:bg-black hover:text-white"
                  
                >
                  Out of Stock
                </Button>
                )
              }
              
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Productside;
