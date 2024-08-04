// import React, { useContext, useState } from "react";
// import { FaChevronRight } from "react-icons/fa";
// import axios from "axios";
// import Loader from "../Components/Loader";
// import { Box, Button, Flex, Text, Heading, useToast } from "@chakra-ui/react";
// import ProductsCarousel from "./ProductsCarousal";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { LoginContext } from "../ContextProvider/LoginProvider";

// const ProductPage = () => {
//   const { id } = useParams();
//   const { cart, setCart,addToCart } = useContext(LoginContext);
//   const toast = useToast();
  
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

//   const [quantity, setQuantity] = useState(1);
//   // const handleIncrement = () => {
//   //   setQuantity(quantity + 1);
//   // };

//   // const handleDecrement = () => {
//   //   if (quantity > 1) {
//   //     setQuantity(quantity - 1);
//   //   }
//   // };

//   const fetchProduct = async () => {
//     const response = await axios.get(
//       `/products/getprodbyid/${id}`
//     );
//     return response.data.data;
//   };

//   const { isLoading, data, refetch, error } = useQuery({
//     queryKey: "Productinfo",
//     queryFn: fetchProduct,
//   });


//   if (isLoading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="mt-20 min-h-[100vh]">
//       <div className="bg-[#f1f2f4] w-full h-16 flex ">
//         <p className="pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center">
//           <span className="font-bold">Products</span> <FaChevronRight />{" "}
//           <span>{data.name}</span>
//         </p>
//       </div>
//       <div className="flex w-full  flex-wrap -mt-10">
//         <div className="w-full lg:w-[70%] min-h-[100vh] flex justify-center items-center p-4">
//           <ProductsCarousel pics={data.pics} />
//         </div>
//         <div className="w-full lg:w-[30%]   p-4">

//           <div className="flex flex-col items-center gap-4  lg:mt-20 md:mt-20">
//             <Heading fontSize="2xl" textAlign="center">
//               {data.name}
//             </Heading>
//             <Text fontSize="lg">{data.description}</Text>
//             <Box mt={4}>
//               <Text fontSize="lg" fontWeight="bold">
//                 Price: Rs. {data.price}
//               </Text>
//             </Box>
//             <div className="mt-4">
//               <Text fontSize="lg" fontWeight="bold">
//                 Quantity:
//               </Text>
//               <div className="flex items-center gap-2">
//                 <Button
//                   onClick={() => {
//                     if (data.quantity > 1) {
//                       updateQuantity(data.id, data.quantity - 1);
//                     }
//                   }}
//                   disabled={data.quantity <= 1}
//                   variant="ghost"
//                 >
//                   -
//                 </Button>
//                 <div>{}</div>
//                 <Button
//                    onClick={() => {
//                     if (data.quantity < 10) {
//                       updateQuantity(data._id, data.quantity + 1);
//                     }
//                   }}
//                   variant="ghost"
//                 >
//                   +
//                 </Button>
//               </div>
//             </div>
//             {
//               data.instock?
//               <Button
//               bg="#636363"
//               color="white"
//               mt={4}
//               w="100%"
//               p={4}
//               fontSize="lg"
//               _hover={{ bg: "#454545" }}
//               onClick={()=>{
//                 addToCart({
//                   name: data.name,
//                   price: data.price,
//                   pic: data.src,
//                   sellerinfo: data.sellerinfo,
//                   id: data._id,
//                   color: data.color,
//                   quantity: data.quantity,
//                 });
//                 toast({
//                   title: "Product Added!",
//                   description: "Product successfully added to cart",
//                   status: "success",
//                   duration: 3000,
//                   isClosable: true,
//                   position: "bottom-right",
//                 });


//               }}
//             >
//               Add To Cart
//             </Button>:<Button
//               disabled
//               bg="#636363"
//               color="white"
//               mt={4}
//               w="100%"
//               p={4}
//               fontSize="lg"
//               _hover={{ bg: "#454545" }}
//             >
//               Out of Stock
//             </Button>

//             }
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


import React, { useContext, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import Loader from "../Components/Loader";
import { Box, Button, Flex, Text, Heading, useToast } from "@chakra-ui/react";
import ProductsCarousel from "./ProductsCarousal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LoginContext } from "../ContextProvider/LoginProvider";

const ProductPage = () => {
  const { id } = useParams();
  const { cart, setCart, addToCart } = useContext(LoginContext);
  const toast = useToast();
  
  const [quantity, setQuantity] = useState(1);

  

  const fetchProduct = async () => {
    const response = await axios.get(
      `/products/getprodbyid/${id}`
    );
    return response.data.data;
  };

  const { isLoading, data, refetch, error } = useQuery({
    queryKey: "Productinfo",
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleIncrement = () => {
    if(quantity<data.quantity){
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mt-20 min-h-[100vh]">
      <div className="bg-[#f1f2f4] w-full h-16 flex ">
        <p className="pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center">
          <span className="font-bold">Products</span> <FaChevronRight />{" "}
          <span>{data.name}</span>
        </p>
      </div>
      <div className="flex w-full  flex-wrap -mt-10">
        <div className="w-full lg:w-[70%] min-h-[100vh] flex justify-center items-center p-4">
          <ProductsCarousel pics={data.pics} />
        </div>
        <div className="w-full lg:w-[30%]   p-4">

          <div className="flex flex-col items-center gap-4  lg:mt-20 md:mt-20">
            <Heading fontSize="2xl" textAlign="center">
              {data.name}
            </Heading>
            <Text fontSize="lg">{data.description}</Text>
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                Price: Rs. {data.price}
              </Text>
            </Box>
            <div className="mt-4">
              <Text fontSize="lg" fontWeight="bold">
                Quantity:
              </Text>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  variant="ghost"
                >
                  -
                </Button>
                <div>{quantity}</div>
                <Button
                  onClick={handleIncrement}
                  disabled={quantity===data.quantity}
                  variant="ghost"
                >
                  +
                </Button>
              </div>
            </div>
            {
              data.instock?
              <Button
              bg="#636363"
              color="white"
              mt={4}
              w="100%"
              p={4}
              fontSize="lg"
              _hover={{ bg: "#454545" }}
              onClick={()=>{
                addToCart({
                  name: data.name,
                  price: data.price,
                  pic: data.src,
                  sellerinfo: data.sellerinfo,
                  id: data._id,
                  color: data.color,
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
            </Button>:<Button
              disabled
              bg="#636363"
              color="white"
              mt={4}
              w="100%"
              p={4}
              fontSize="lg"
              _hover={{ bg: "#454545" }}
            >
              Out of Stock
            </Button>

            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
