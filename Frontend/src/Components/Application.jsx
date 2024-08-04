import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
  Collapse,
  Avatar,
} from "@mui/material";
import {
  CheckCircleOutline,
  HighlightOff,
  ExpandMore,
} from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Loader from "../Components/Loader";

const fetchSellers = async () => {
  try {
    const response = await axios.get("/sellers/getpending", {
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

const Application = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["Applications"],
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: fetchSellers,
  });
  const [apidata, setApidata] = useState([]);

  useEffect(() => {
    if (data) {
      setApidata(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="absolute top-[50%] left-[46%] lg:left-[50%] md:left-[50%] ">
        <Loader />
      </div>
    );

  const handleAccept = (id) => {
    axios
      .post(
        "/sellers/updatestatus",
        { status: "approved", SellerId: id },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        queryClient.invalidateQueries("Sellers");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = (id) => {
    axios
      .post(
        "/sellers/updatestatus",
        { status: "rejected", SellerId: id },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        queryClient.invalidateQueries("Sellers");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2}>
      {apidata.map((item) => (
        <Grid item key={item._id} xs={12} sm={6}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  alt={item.name}
                  src={item.User.profilePic}
                  sx={{ width: 64, height: 64 }}
                />
              }
              title={item.name}
              subheader={item.email}
            />
            <Collapse in={true} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body1">Phone: {item.phone}</Typography>
                <Typography variant="body1">Address: {item.address}</Typography>
                <Typography variant="body1">
                  Business Name: {item.businessName}
                </Typography>
                <Typography variant="body1">Status: {item.status}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircleOutline />}
                  onClick={() => {
                    handleAccept(item._id);
                    toast({
                      title: "Application accepted",
                      description: `${item.name} is an approved seller now`,
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<HighlightOff />}
                  onClick={() => {
                    handleReject(item._id);
                    toast({
                      title: "Application Rejected",
                      description: `${item.name}'s application to be an approved seller is rejected`,
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }}
                >
                  Reject
                </Button>
              </CardActions>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Application;
