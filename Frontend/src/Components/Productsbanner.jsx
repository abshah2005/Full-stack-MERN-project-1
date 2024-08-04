import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaChevronRight,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import { Button } from "@chakra-ui/react";
import { stagger } from "framer-motion";

const furnitureProducts = [
  {
    name: "Modern Sofa",
    price: "$899",
    description: "Comfortable and stylish sofa for your living room.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVybml0dXJlfGVufDB8fDB8fHww",
  },
  {
    name: "Elegant Dining Table",
    price: "$1299",
    description: "Sturdy dining table with a sleek design.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnVybml0dXJlfGVufDB8fDB8fHww",
  },
  {
    name: "Vintage Armchair",
    price: "$599",
    description: "Classic armchair with premium upholstery.",
    image:
      "https://media.istockphoto.com/id/1387708113/photo/home-interior-mock-up-with-cozy-sofa-on-white-wall-background-3d-render.webp?b=1&s=170667a&w=0&k=20&c=4DiIAh38FukvMtCGYBpR53Gp3odI3ZmxRYWWC1bVxZQ=",
  },
  {
    name: "Contemporary Bed Frame",
    price: "$1499",
    description: "Minimalist bed frame with a modern touch.",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Rustic Coffee Table",
    price: "$449",
    description: "Solid wood coffee table with rustic charm.",
    image:
      "https://media.istockphoto.com/id/1350859272/photo/luxury-furniture-goods.webp?b=1&s=170667a&w=0&k=20&c=608apow7e_EtKc-N899ru7BiYxrOt_8ar1_Ydh01sn4=",
  },
];

const Productsbanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  const textRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    const elements = [
      textRef.current.querySelector(".product-name"),
      textRef.current.querySelector(".price"),
      textRef.current.querySelector(".description"),
      textRef.current.querySelector(".button"),
    ];

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          duration: 1,
          y: 0,
          delay: index * 0.3,
          ease: "power1.inOut",
        }
      );
    });

    gsap.fromTo(imgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, [currentImageIndex, slideDirection]);

  const handlePrev = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? furnitureProducts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === furnitureProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setSlideDirection(index < currentImageIndex ? "left" : "right");
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pt-20">
      <div className="bg-[#f1f2f4] w-full h-16 flex ">
        <p className=" pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center">
          {" "}
          <span className="font-bold">Home</span> <FaChevronRight />{" "}
          <span></span>
        </p>
      </div>
      <div className="popular w-full h-[100vh]  flex items-center justify-between m-auto gap-3 relative ">
        <div className="w-[40%] h-[100%] hidden sm:block  text-black">
          <div ref={textRef} className="  info pt-16 pl-5 relative top-[20%]">
            <div className="font-bold text-3xl product-name">
              Product Name: {furnitureProducts[currentImageIndex].name}
            </div>
            <div className="font-bold text-2xl price">
              Price: {furnitureProducts[currentImageIndex].price}
            </div>
            <div className="font-bold text-xl description">
              Description: {furnitureProducts[currentImageIndex].description}
            </div>
          </div>
        </div>
        <div className="sm:w-[50%] h-[100%] lg:h-[100%] md:h-[100%]  w-full    bg-black text-white img relative">
          <img
            ref={imgRef}
            key={currentImageIndex}
            src={furnitureProducts[currentImageIndex].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />

          <div
            ref={textRef}
            className="text-xl font-bold info pt-10 inner
              absolute top-[15%] left-[15%]
              
             block sm:hidden bg-gray-500/1.2 h-[12rem]  w-[80%]"
          >
            <div>
              <div className="text-3xl product-name">
                {furnitureProducts[currentImageIndex].name}
              </div>
              <div className="text-2xl price">
                Price: {furnitureProducts[currentImageIndex].price}
              </div>
              <div className="text-xl w-[60%] description">
                Description: {furnitureProducts[currentImageIndex].description}
              </div>
              <div className="pt-2 button">
                <button className="bg-white rounded-md p-2 mt-5 flex justify-center items-center text-black hover:bg-black hover:text-white transition-all transition-2s">
                  More Details <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 left-4 right-4 flex justify-center mb-16 lg:mb-16 md:mb-16">
            {furnitureProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 mx-1 rounded-full bg-white    ${
                  index === currentImageIndex ? "opacity-100" : "opacity-50"
                }`}
              ></button>
            ))}
          </div>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-white bg-opacity-10 text-white p-2 rounded-full shadow-md "
            onClick={handlePrev}
          >
            <div className="text-3xl">
              <FaArrowCircleLeft />
            </div>
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full shadow-md "
            onClick={handleNext}
          >
            <div className="text-3xl">
              <FaArrowCircleRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productsbanner;
