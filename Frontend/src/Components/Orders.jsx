import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Loader from "./Loader"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Orders = () => {
  const Token = JSON.parse(localStorage.getItem("Token"));
  const queryClient = useQueryClient();

  const FetchOrders = async () => {
    const response = await axios.get("/orders/getorders", {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["Orders"],
    queryFn: FetchOrders,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.post(
        `/orders/updateorder/${id}`,
        {status},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      alert("Order status updated successfully");
      // Invalidate and refetch
      queryClient.invalidateQueries("Orders");
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
    // console.log(id);
    // console.log(status);
  };

  const [adminView, setAdminView] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAdminMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleAdminView = () => {
    setAdminView(!adminView);
    handleAdminMenuClose();
  };
  const pendingOrders=data?.filter((order)=>{
    return order.status==="Pending"
  })
  

  if (isLoading) return <div className="absolute top-[50%] left-[50%]"><Loader /></div>;
  if (error) return <p>Error loading orders: {error.message}</p>;
  return (
    <Grid container spacing={3}>
      {pendingOrders?.map((order) => (
        <Grid item key={order.user.id} xs={12} sm={6} md={4} lg={4}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h3>Order number: {data.indexOf(order) + 1}</h3>
              <Button onClick={handleAdminMenuOpen}>Admin Menu</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAdminMenuClose}
              >
                <MenuItem onClick={toggleAdminView}>
                  {adminView ? "Hide Details" : "Show Details"}
                </MenuItem>
              </Menu>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {order?.orders.map((product) => (
                  <div key={product.id}>
                    <p>Product Name: {product.name}</p>
                  </div>
                ))}
                {adminView && (
                  <div>
                    <p>
                      <b>Customer Name: {order.userinfo.name}</b>
                    </p>
                    <p className="font-bold">
                      Customer Phone: {order.userinfo.phone}
                    </p>
                    <p>Customer Email: {order.userinfo.email}</p>
                    <p>Customer Address: {order.userinfo.address}</p>
                  </div>
                )}
                <p>Status: {order.status}</p>
                <p>Total Amount: {order.total}</p>
                <p>Payment Method: {order.paymentMethod}</p>
              </div>
            </AccordionDetails>
            <AccordionDetails>
              <AccordionActions>
                <Button variant="contained" color="primary" onClick={()=>{
                  updateOrderStatus(order._id,"Delivered")
                }}>
                  Deliver
                </Button>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </AccordionActions>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default Orders;
