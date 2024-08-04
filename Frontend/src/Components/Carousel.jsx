import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Card from "./Card";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const fetchProducts = async () => {
  const response = await axios.get("/products/getproducts");
  return response.data.data;
};

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  if (isLoading)
    return (
      <Box className="flex items-center justify-center h-[100vh] bg-[#14213d]">
        <Loader />
      </Box>
    );

  if (error) {
    return (
      <Box className="flex items-center justify-center h-[100vh] bg-[#14213d] text-white">
        Error loading products: {error.message}
      </Box>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = data.slice(startIndex, startIndex + itemsPerPage);

  return (
     <>
     
     <Box
      className="
      
       w-[100%]  m-auto h-auto "
    >
      <div className="text-center text-black text-3xl font-bold  ">
        <p>ALL PRODUCTS</p>
      </div>
      
      <Grid
        className="h-full w-[80%] rounded-md text-black gap-5 m-auto relative pt-10 "
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {currentProducts.map((item, i) => (
          <GridItem key={i}>
            <Card
              price={item.price}
              name={item.name}
              src={item.pics[0]}
              color={item.color}
              sellerinfo={item.sellerinfo}
              id={item._id}
              description={item.description}
              pics={item.pics}
              origquantity={item.quantity}
              instock={item.instock}
              gltfModels={item.gltfModels}
            />
          </GridItem>
        ))}
      </Grid>
      <Box className="flex justify-around w-[90%] left-5 relative  mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-2 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </Button>
      </Box>
      <hr className="w-[80%]  relative left-[10%] mt-5 shadow-md" />
    </Box>
     </>
    
  );
};

export default Carousel;

// bg-[#2B124C]
