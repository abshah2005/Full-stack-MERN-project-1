import { Button } from "@mui/material";
import * as React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import { useQuery,useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../../FinalHuzaifa/src/Controllers/Products.controller";
import { useToast } from "@chakra-ui/react";

const fetchProducts = async () => {
  const response = await axios.get("/products/getproducts");
  return response.data.data;
};





const Products = () => {
  const { isLoading, data, error,refetch } = useQuery({
    queryKey: ["adminProducts"],
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: fetchProducts,
  });
  const Token=JSON.parse(localStorage.getItem("Token"));
  const toast =useToast();
  const [apidata, setApidata] = useState([]);

  const deleteProduct=async(productId)=>{
    const response=await axios.delete(`/products/deleteproduct/${productId}`,{
      headers:{
        Authorization:`Bearer ${Token}`
      },
    });
    refetch();
    return response.data.data;
  }

  useEffect(() => {
    if (data) {
      setApidata(data);
    }
  }, [data]);

  if (isLoading) return <div className='absolute top-[50%] left-[46%] lg:left-[50%] md:left-[50%] '><Loader /></div>;

  if (error) {
    return (
      <div>
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-[100%]">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
        </div>
        <div className="float-right">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Total Products ={apidata.length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 overflow-y-scroll overflow-x-hidden scrollbar pb-10 w-full">
        {apidata.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between "
          >
            <div className="w-[25%]">
              <img src={product.pics[0]} className="w-35 h-28 contain" alt="" />
            </div>
            <div className="w-[50%] pl-3">
              <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-gray-600 mb-2">quantity:{product.quantity}</p>
              <p className="text-gray-500">
                seller name:- {product.sellerinfo.name}
              </p>
              <p className="text-gray-500">
                seller email:- {product.sellerinfo.email}
              </p>
              <p className="text-gray-500">
                Brand name:- {product.sellerinfo.businessName}
              </p>
            </div>
            <div className="flex justify-between items-center  w-[25%]">
              <div>
                
                <Button
                  aria-label="delete"
                  variant="contained"
                  color="secondary"
                  startIcon={<MdDelete />}
                  onClick={()=>{
                    deleteProduct(product._id)
                    toast({
                      title: "Product Deleted",
                      status:"success",
                      duration: 2000,
                      isClosable: true,
                    })
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
