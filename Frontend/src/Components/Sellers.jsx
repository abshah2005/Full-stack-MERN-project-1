import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Components/Loader";
import { LoginContext } from "../ContextProvider/LoginProvider";

const fetchSellers = async () => {
  try {
    const response = await axios.get("/sellers/getapproved", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
      },
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Error fetching sellers: ${error.message}`);
  }
};

const Sellers = () => {
  const{Brands,setBrands}=useContext(LoginContext)
  const queryClient = useQueryClient();
  
  const { isLoading, data, error } = useQuery({
    queryKey: ["Sellers"],
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: fetchSellers,
  });
  const [apidata, setApidata] = useState([]);

  setBrands(data);

  useEffect(() => {
    if (data) {
      setApidata(data);
      setBrands(data);
    }
  }, [data]);


  if (isLoading)
    return (
      <div className="absolute top-[50%] left-[46%] lg:left-[50%] md:left-[50%] ">
        <Loader />
      </div>
    );

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const handleReject = (id) => {
    const requestData = {
      status: "rejected",
      SellerId: id,
    };

    axios
      .post("/sellers/updatestatus", requestData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
        },
        withCredentials: true,
      })
      .then(() => {
        queryClient.invalidateQueries("Sellers");
      })
      .catch((err) => {
        console.log("Error rejecting seller:", err);
      });
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 ">
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", color: "#374151" }}
        >
          Sellers
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", color: "#374151" }}
        >
          Total Sellers: {apidata.length}
        </Typography>
      </div>

      <Grid container spacing={3}>
        {apidata.map((entity) => (
          <Grid item key={entity._id} xs={12}>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="w-1/4">
                <div
                  className="w-28 h-28 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${entity.User.profilePic})`,
                    backgroundColor: "#e0e0e0", // Fallback background color
                  }}
                ></div>
              </div>
              <div className="w-3/6 pl-4">
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {entity.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Seller's ID: {entity._id}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  Brand Name: {entity.businessName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {entity.address}
                </Typography>
              </div>
              <div className="w-1/5 flex justify-end">
                <Button
                  onClick={() => {
                    handleReject(entity._id);
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdDelete />}
                  sx={{ textTransform: "none" }}
                >
                  Remove Seller
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Sellers;
