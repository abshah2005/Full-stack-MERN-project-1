import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Loader from "./Loader";

const SellerApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    businessName: "",
    brandLogo: null,
  });
  const [Loading,setLoading]=useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, brandLogo: e.target.files[0] });
    } else {
      console.error("No files selected");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("User"));
    const formDataToSend = new FormData();
    formDataToSend.append("User", user._id);

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const res = await axios.post("/sellers/apply", formDataToSend, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.data);
      setLoading(false);
      alert("Application submitted successfully");
    } catch (err) {
      console.log(err);
      alert("Failed");
      setLoading(false)
    }
  };



  return (
    <Box
      maxW={{ base: "90%", sm: "80%", md: "50%" }}
      mx="auto"
      mt={24}
      mb={10}
      p={6}
      bg="white"
      rounded="md"
      shadow="md"
    >
       {Loading && (
        <>
          <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur pointer-events-none z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Loader />
          </div>
          <div className="fixed inset-0 pointer-events-auto z-50">
          </div>
        </>
      )}
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="businessName">Business Name</FormLabel>
          <Input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="brandLogo">Business Logo</FormLabel>
          <Input
            type="file"
            id="brandLogo"
            name="brandLogo"
            accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/avif,model/gltf+json,model/gltf-binary"
            onChange={handleFile}
            placeholder="Place your brand logo here"
            required
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          mt={4}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default SellerApplication;
