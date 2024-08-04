import React, { Suspense, useContext, useState } from "react";
import { LoginContext } from "../ContextProvider/LoginProvider";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { Button, useToast } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Productside from "./Productside";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import ModelViewer1 from "./ModelViewer1";

const Card = ({
  name,
  price,
  src,
  id,
  sellerinfo,
  color,
  isCat,
  description,
  pics,
  origquantity,
  instock,
  isBrand,
  BrandLogo,
  Brandname,
  gltfModels,
}) => {
  const [quantity, setQuantity] = useState(0);
  const toast = useToast();
  const handleIncrement = () => {
    if (quantity < origquantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const { addToCart } = useContext(LoginContext);

  if (isCat) {
    return (
      <div>
        <div className="card rounded-md border  border-black/0.5  bg-white o shadow-lg p-4 w-[80%] m-auto h-[25rem] md:w-[90%] lg:w-full relative overflow-visible">
          <div className="card-img bg-orange-200 h-[60%] w-full rounded-lg transition-transform duration-300 ease-in-out overflow-hidden aspect-square ">
            <img
              src={src}
              loading="lazy"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="card-info pt-10">
            <p className="text-title font-black text-xl leading-6 text-black text-center pb-4">
              {name}
            </p>
          </div>
          <div className="card-footer w-full flex justify-between items-center pt-2.5 border-t border-gray-300">
            <div className="flex justify-center items-center w-full pt-2">
              <Button
                variant="outline"
                colorScheme="black"
                className="w-full mb-2 hover:bg-black hover:text-white"
              >
                See Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isBrand) {
    return (
      <div>
        <div className="card rounded-md border  border-black/0.5  bg-white o shadow-lg p-4 w-[80%] m-auto h-[25rem] md:w-[90%] lg:w-full relative overflow-visible">
          <div className="card-img bg-orange-200 h-[60%] w-full rounded-lg transition-transform duration-300 ease-in-out overflow-hidden aspect-square ">
            <img
              src={BrandLogo}
              loading="lazy"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="card-info pt-10">
            <p className="text-title font-black text-xl leading-6 text-black text-center pb-4">
              {Brandname}
            </p>
          </div>
          <div className="card-footer w-full flex justify-between items-center pt-2.5 border-t border-gray-300">
            <div className="flex justify-center items-center w-full pt-2">
              <Button
                variant="outline"
                colorScheme="black"
                className="w-full mb-2 hover:bg-black hover:text-white"
              >
                See Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card rounded-md border  border-black/0.5  bg-black o shadow-lg p-4 w-[80%] m-auto  md:w-[90%] lg:w-full relative overflow-visible h-[30rem]">
        {gltfModels && gltfModels.length > 0 ? (
          <div className=" h-[60%] w-full rounded-lg overflow-hidden">
            <Suspense
              fallback={
                <div className="flex justify-center items-center m-auto w-full h-full">
                  <Loader />
                </div>
              }
            >
              <ModelViewer1 ModelUrl={gltfModels[0]} />
            </Suspense>
          </div>
        ) : (
          <Link to={`/Productsinfo/${id}`}>
            <div className="card-img bg-orange-200 h-[60%] w-full rounded-lg transition-transform duration-300 ease-in-out overflow-hidden aspect-square">
              <img
                src={src}
                className="h-full w-full object-cover"
                loading="lazy"
                alt={name}
              />
            </div>
          </Link>
        )}

        <Link to={`/Productsinfo/${id}`}>
          <div className="card-info pt-10">
            <p className="text-title font-black text-xl leading-6 text-black">
              {name.length > 25 ? name.slice(0, 25) : name}
            </p>
            <p className="text-body text-sm pb-2.5 text-black ">
              {description && description.slice(0, 60)}
              <span>...</span>
            </p>
          </div>
        </Link>
        <div className="card-footer w-full flex justify-between items-center pt-2.5 border-t border-gray-300">
          <span className="text-title font-black text-xl text-black">
            {price}
          </span>

          {instock ? (
            <>
              <div className="quantity-counter flex items-center">
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
            </>
          ) : (
            <>
              <button>Out of Stock</button>
            </>
          )}

          <Tooltip label="Quick review" placement="top">
            <div>
              <Productside
                name={name}
                price={price}
                pics={pics}
                description={description}
                id={id}
                color={color}
                sellerinfo={sellerinfo}
                src={src}
                instock={instock}
              />
            </div>
          </Tooltip>

          {instock ? (
            <>
              <Tooltip label="Add to cart" placement="top">
                <div
                  className="card-button flex items-center justify-center w-9 h-9 bg-white rounded-full border border-black cursor-pointer hover:bg-black transition duration-300 ease-in-out"
                  onClick={() => {
                    if(quantity>0){
                      addToCart({
                        name: name,
                        price: price,
                        pic: src,
                        sellerinfo: sellerinfo,
                        id: id,
                        color: color,
                        quantity: quantity,
                      });
                    }
                    if(quantity>0){
                      toast({
                        title: "Product Added!",
                        description: "Product successfully added to cart",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "bottom-right",
                      });
                    }
                    if(quantity==0){
                      toast({
                        title: "Selected Quantity is zero please make sure quantity is more than zero",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });
                    }
                    
                  }}
                >
                  <svg className="svg-icon w-5 h-5 text-black hover:text-white">
                    <path
                      className="fill-current"
                      d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
                    ></path>
                    <path
                      className="fill-current"
                      d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
                    ></path>
                    <path
                      className="fill-current"
                      d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
                    ></path>
                  </svg>
                </div>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip label="Out of Stock" placement="top">
                <div className="card-button flex items-center justify-center w-9 h-9 bg-white rounded-full border border-black cursor-pointer hover:bg-black transition duration-300 ease-in-out">
                  {/* <svg
                    className="svg-icon w-5 h-5 text-gray-500 hover:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="fill-current"
                      d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
                    />
                    <path
                      className="fill-current"
                      d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
                    />
                    <path
                      className="fill-current"
                      d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
                    />
                    <path
                      className="fill-current"
                      d="M12 16.5l-1.5-1.5L9 16.5 7.5 15 6 16.5l1.5 1.5L6 19.5l1.5 1.5L9 18 10.5 19.5 12 18l-1.5-1.5L12 16.5z"
                    />
                  </svg> */}
                  <MdOutlineRemoveShoppingCart className="bg-white text-black text-xl hover:bg-black hover:text-white transition duration-300" />
                </div>
              </Tooltip>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Card;
