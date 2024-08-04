import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Card from "./Card";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { LoginContext } from "../ContextProvider/LoginProvider";

const BrandProducts = () => {
  const { globalCat, setGlobalCat } = React.useContext(LoginContext);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All Products");
  const { name } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProductsByCategory = async () => {
    const response = await axios.get(`/products/getproductsbybrand/${name}`);
    return response.data.data;
  };

  const { isLoading, data, refetch, error } = useQuery({
    queryKey: ["CatProducts", name],
    queryFn: fetchProductsByCategory,
    staleTime: 60 * 5 * 1000,
    cacheTime: 60 * 10 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [name, refetch]);


  useEffect(() => {
    if (data) {
      handleFilter(filter);
    }
  }, [data, filter]);

  const handleFilter = (filterType) => {
    let sortedData = [...data];
    if(filterType==="All Products"){
      sortedData=data;
    }else{
      sortedData=data.filter((product)=>product.Category===filterType);
    }
    
    setFilteredData(sortedData);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (isLoading)
    return (
      <Box className="flex items-center justify-center h-[100vh] bg-white">
        <Loader />
      </Box>
    );

  if (error) {
    return (
      <Box className="flex items-center justify-center h-[100vh] bg-white text-black">
        Error loading products: {error.message}
      </Box>
    );
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box className="w-full m-auto h-auto pt-20 min-h-[80vh]">
      <div className="bg-[#f1f2f4] w-full h-16 flex">
        <p className="pl-[5%] md:pl-[15%] lg:pl-[13%] flex items-center">
          <span className="font-bold">Products</span> <FaChevronRight />
          <span>{name}</span>
        </p>
      </div>

      <div className="block w-full h-auto lg:flex md:flex">
        <div className="lg:w-[25%] md:w-[25%] w-full min-h-[10vh]">
          {/* for small screens */}
          <div className="bg-gray-800 py-4 px-6 flex justify-between items-center border-b border-gray-600 w-full h-full sm:hidden">
            <label className="text-white font-bold mr-4">Filter by:</label>
            <select className="bg-gray-900 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" onChange={handleFilterChange}>
            <option value="All Products" >All Products</option>
              {
                globalCat.map((item)=>(
                  <option value={item.name}>{item.name}</option>
                ))
              }
            </select>
          </div>
          {/* for small screens */}

          {/* for large screens */}
          <div className="w-full h-full hidden lg:block md:block ">
            <div className="w-[100%] mt-20 ml-10 h-[20%] mx-auto  flex justify-center items-center ">
              <ul className="py-4 text-center mt-20 w-[80%]">
                {globalCat?.map((item) => (
                  <>
                    <li onClick={()=>setFilter(item.name)} className="px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer">
                      {item.name}
                    </li>
                    <hr className="border-gray-200" />
                  </>
                ))}

                <hr className="border-gray-200" />
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-black text-3xl font-bold left-[25%] absolute  lg:left-[55%] md:left-[55%] flex">
          <p className="font-bold text-2xl   mt-1  sm:mb-10  w-[100%]">
            {name} 
          </p>
          <p className="font-bold text-2xl  underline pt-1 pl-2 text-black">{filter}</p>
          <p className="text-sm">{"("}{currentProducts.length}{")"}</p>
        </div>

        <div className="w-full lg:w-[60%] md:w-[65%] h-full rounded-md text-black gap-5 m-auto relative pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 min-h-[50vh]">
          {currentProducts.length>0?currentProducts.map((item, i) => (
            <div key={i}>
              <Card
                price={item.price}
                name={item.name}
                src={item.pics[0]}
                color={item.color}
                sellerinfo={item.sellerinfo}
                id={item._id}
                description={item.description}
                pics={item.pics}
                instock={item.instock}
              />
            </div>
          ))
         : ( <div className="text-center mt-20 text-3xl font-semibold text-black/40 w-full relative lg:left-[70%] md:left-[70%] lg:m-auto md:m-auto">No products Found</div> )
        }
        </div>
      </div>

      <Box className="flex justify-around w-[90%] mx-auto mt-4 lg:w-[50%] md:w-[50%] relative md:left-[20%] lg:left-[20%]">
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
      <hr className="w-[80%] mx-auto mt-5 shadow-md" />
    </Box>
  );
};

export default BrandProducts;
