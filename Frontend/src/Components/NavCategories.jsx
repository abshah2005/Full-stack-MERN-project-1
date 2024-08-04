import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Card from "./Card";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import {Link} from "react-router-dom"
import { FaChevronRight } from "react-icons/fa";
import { LoginContext } from "../ContextProvider/LoginProvider";


const fetchCategories = async () => {
  const response = await axios.get("/categories/getCategories");
  return response.data.data;
};



const NavCategories = () => {
  const{random,setRandom}=useContext(LoginContext);
  const { isLoading, data, error } = useQuery({
    queryKey: ["UserCategories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  console.log(data)
  if (isLoading)
    return (
      <Box className="flex items-center justify-center h-[100vh] bg-white">
        <Loader />
      </Box>
    );
  if (error) {
    return (
      <Box className="flex items-center justify-center h-[100vh] bg-white text-white">
        Error loading products: {error.message}
      </Box>
    );
  }

  return (
    <div className="mt-20">
      <div className='bg-[#f1f2f4] w-full h-16 flex '>
        <p className='pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center'> <span className='font-bold'>Home</span> <FaChevronRight />  <span>Categories</span></p>
      </div>
      <div>
        <Box
          className="
      
       w-[100%]  m-auto h-auto "
        >
          <div className="text-center text-black text-3xl font-bold  ">
            <p>ALL Categories</p>
          </div>

          <Grid
            className="h-full w-[80%] rounded-md text-black gap-5 m-auto relative pt-10 "
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
          >
            {data.map((item, i) => (
              <GridItem key={i}>
                <Link to={`/CategorizedProducts/${item.name}`}>
                <Card
                  name={item.name}
                  src={item.pic}
                  id={item._id}
                  isCat={true}
                />
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default NavCategories;
