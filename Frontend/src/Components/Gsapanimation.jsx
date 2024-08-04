import React, { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@chakra-ui/react";
import { LoginContext } from "../ContextProvider/LoginProvider";

gsap.registerPlugin(ScrollTrigger);

const Gsapanimation = () => {
    const{random,setRandom}=useContext(LoginContext)
  const textRef1 = useRef();
  const textRef2 = useRef();

  useGSAP(() => {
    gsap.to(textRef1.current.children, {
      opacity: 1,
      y: -50,
      ease: "power1.inOut",
      stagger:0.2,
      scrollTrigger: {
        trigger: textRef1.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
      delay: 0.1,
    });

    gsap.to(textRef2.current.children, {
      opacity: 1,
      y: -50,
      ease: "power1.inOut",
      stagger:0.2,
      scrollTrigger: {
        trigger: textRef2.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
      delay: 0.1,
    });
  }, []);
  const items = [
    {
      createdAt: "2024-07-13T08:37:59.707Z",
      name: "Side Tables",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720859582/bt9xuhbssfzgokwe5usz.jpg",
      updatedAt: "2024-07-13T08:37:59.707Z",
      __v: 0,
      _id: "66923ce7d7d58d34dc1aaab6"
    },
    {
      createdAt: "2024-07-13T08:42:15.589Z",
      name: "Sofas",
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLqaimDwG9sZpwfcJGPDxEmfy5Fj1Uj1d2w&s",
      updatedAt: "2024-07-13T08:42:15.589Z",
      __v: 0,
      _id: "66923de7d7d58d34dc1aaabe"
    },
    {
      createdAt: "2024-07-13T08:46:18.785Z",
      name: "Dining Tables",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720860081/wcuak5nyqoiypnfqypts.jpg",
      updatedAt: "2024-07-13T08:46:18.785Z",
      __v: 0,
      _id: "66923edad7d58d34dc1aaac2"
    },
    {
      createdAt: "2024-07-13T08:47:59.929Z",
      name: "Cupboards",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720864418/hb5gjjha0nykae5md4xl.jpg",
      updatedAt: "2024-07-13T09:58:35.134Z",
      __v: 0,
      _id: "66923f3fd7d58d34dc1aaac6"
    },
    {
      createdAt: "2024-07-13T08:50:07.956Z",
      name: "Chairs",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720860309/qgmerkeqwkykgrzceapp.jpg",
      updatedAt: "2024-07-13T08:50:07.956Z",
      __v: 0,
      _id: "66923fbfd7d58d34dc1aaaca"
    },
    {
      createdAt: "2024-07-17T18:10:17.461Z",
      name: "Beds",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1721239515/fytopfwhy81ha1vsvfum.avif",
      updatedAt: "2024-07-17T18:10:17.461Z",
      __v: 0,
      _id: "669809092c978b7d1222debc"
    }
  ];


  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center mt-10 mb-10">
      <div className="main w-[75%] min-h-[100vh] bg-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow-lg">
        <div
          className="
          w-[80%]
          pt-10 text-white  flex justify-center items-center m-auto h-[45vh] lg:h-[80%] md:lg-h[80%]"
        >
          <div ref={textRef1} className="pt-6">
            <p
              className="text-start font-bold text-3xl  text1  opacity-0"
              
            >
              Best {items[3].name} in Town
            </p>
            <p className="text-start font-bold text-xl    opacity-0">
             {items[3].name} is a must have in every home. It is a piece...
            </p>
            <div className="opacity-0 pt-5">
            <Button>Click here</Button>
            </div>
          </div>
        </div>
        <div className="h-full">
          <img
            className="object-cover w-full h-full"
            
            src={items[5].pic}
          />
        </div>
        <div className="h-full">
          <img
            className="object-cover w-full h-full"
            
            src={items[5].pic}
          />
        </div>
        <div
          className="
          w-[80%]
          pt-10 text-white  flex justify-center items-center m-auto h-[45vh] lg:h-[80%] md:lg-h[80%]"
        >
          <div ref={textRef2} className="pt-6">
            <p className="text-start font-bold text-3xl  text1  opacity-0">
              Luxurious {items[5].name} at your click
            </p>
            <p className="text-start font-bold text-xl    opacity-0">
             {items[5].name} is a must have in every home.Buy today..
            </p>
            <div className="opacity-0 pt-5">
            <Button>Click here</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gsapanimation;

// bg-[rgb(45,45,45)]
