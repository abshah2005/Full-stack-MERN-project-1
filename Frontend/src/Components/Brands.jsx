import React, { useContext } from "react";

import { FaChevronRight } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Card from "./Card";

const Brands = () => {
  const brands = async () => {
    const Brandsdata = await axios.get("/brands/getbrands");
    return Brandsdata.data;
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: "Brands",
    queryFn: brands,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
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
      <div className="bg-[#f1f2f4] w-full h-16 flex  ">
        <p className="pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center">
          {" "}
          <span className="font-bold">Home</span> <FaChevronRight />{" "}
          <span className="font-bold">Brands</span>
        </p>
      </div>
      {/* <div className="mt-20">
        {data?.map((entity) => (
          <div key={entity._id}>
            <p>{entity.BrandLogo}</p>
            <p>{entity.Brandname}</p>
          </div>
        ))}
      </div> */}

      <div>
        <Box
          className="
      
       w-[100%]  m-auto h-auto "
        >
          <div className="text-center text-black text-3xl font-bold  ">
            <p>ALL Brands</p>
          </div>

          <Grid
            className="h-full w-[80%] rounded-md text-black gap-5 m-auto relative pt-10 "
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
          >
            {data?.map((item, i) => (
              <GridItem key={i}>
                <Link to={`/BrandProducts/${item.Brandname}`}>
                  <Card
                    BrandLogo={item.BrandLogo}
                    Brandname={item.Brandname}
                    isBrand={true}
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

export default Brands;
