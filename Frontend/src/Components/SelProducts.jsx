import * as React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import { useQuery } from "@tanstack/react-query";
import { IoIosCube } from "react-icons/io";
import { LoginContext } from "../ContextProvider/LoginProvider";

const fetchProducts = async () => {
  const response = await axios.get("/products/getprodbySellerId", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
    },
  });
  return response.data.data;
};

const SelProducts = () => {
  const [loading, setLoading] = useState(false);
  const { globalCat, setGlobalCat } = React.useContext(LoginContext);
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["sellerProducts"],
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: fetchProducts,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    Category: globalCat.length > 0 ? globalCat[0].name : "",
    pics: [],
    sellerInfo: "",
    quantity: 0,
    color: "",
    dprice: "",
    description: "",
    gltfModels: [],
    brand: "",
  });
  const [inputFields, setInputFields] = useState([0]);
  const [inputFieldsGltf, setInputFieldsGltf] = useState([0]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setProduct({
      _id: "",
      name: "",
      price: "",
      Category: globalCat.length > 0 ? globalCat[0].name : "",
      pics: [],
      sellerInfo: "",
      quantity: 0,
      color: "",
      dprice: "",
      description: "",
      gltfModels: [],
      brand: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // const handleFileChange = (index, event) => {
  //   const newPics = [...product.pics];
  //   newPics[index] = event.target.files[0];
  //   setProduct((prevProduct) => ({ ...prevProduct, pics: newPics }));

  //   if (index === inputFields.length - 1 && inputFields.length < 5) {
  //     setInputFields((prevFields) => [...prevFields, prevFields.length]);
  //   }
  // };

  const handleFileChange = (index, event, type) => {
    const files = event.target.files;

    if (type === "pics") {
      const newPics = [...product.pics];
      newPics[index] = files[0];
      setProduct((prevProduct) => ({ ...prevProduct, pics: newPics }));

      // Add new input field if needed
      if (index === inputFields.length - 1 && inputFields.length < 5) {
        setInputFields((prevFields) => [...prevFields, prevFields.length]);
      }
    } else if (type === "gltfModels") {
      if (files.length > 5) {
        alert("You can only upload up to 5 GLTF models.");
        return;
      }

      const newGltfModels = [...product.gltfModels];
      for (let i = 0; i < files.length; i++) {
        newGltfModels.push(files[i]);
      }
      setProduct((prevProduct) => ({
        ...prevProduct,
        gltfModels: newGltfModels,
      }));

      // Add new input field if needed
      if (index === inputFieldsGltf.length - 1 && inputFieldsGltf.length < 5) {
        setInputFieldsGltf((prevFields) => [...prevFields, prevFields.length]);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loader

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("color", product.color);
    formData.append("dprice", product.dprice);
    formData.append("Category", product.Category);
    formData.append("description", product.description);
    formData.append("instock", product.quantity > 0);
    formData.append("brand", product.brand);

    product.pics.forEach((pic, index) => {
      if (pic instanceof File) {
        formData.append("pics", pic);
      }
    });
    product.gltfModels.forEach((model, index) => {
      if (model instanceof File) {
        formData.append("gltfModels", model);
      }
    });

    try {
      let response;
      if (product._id) {
        response = await axios.put(
          `/products/updateproduct/${product._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("Token")
              )}`,
            },
          }
        );
        alert("Product Updated Successfully");
      } else {
        response = await axios.post("/products/createproduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          },
        });
        alert("Product Created:", response.data);
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsOpen(true);
  };

  const handleDeleteModalOpen = (productId) => {
    setProduct({ ...product, _id: productId });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setProduct({
      _id: "",
      name: "",
      price: "",
      Category: globalCat.length > 0 ? globalCat[0].name : "",
      pics: [],
      sellerInfo: "",
      quantity: 0,
      color: "",
      dprice: "",
      description: "",
      brand: "",
      gltfModels: [],
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/products/deleteProduct/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          },
        }
      );
      alert("Product Deleted:", response.data);
      refetch();
      handleDeleteModalClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-[50%] left-[46%] lg:left-[50%] md:left-[50%] ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-[100%]">
        <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
        <h2 className="text-2xl font-bold mb-4 text-white">
          Total Products = {data.length}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 overflow-y-scroll overflow-x-hidden scrollbar pb-10 w-full h-[100vh]">
        {data.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between"
          >
            <div className="w-[25%]">
              <img
                src={product.pics.length > 0 ? product.pics[0] : ""}
                className="w-35 h-28 contain"
                alt=""
              />
            </div>
            <div className="w-[50%] pl-3">
              <h3 className="text-lg font-semibold mb-2 text-black">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
              <p className="text-gray-500">
                Seller Name: {product.sellerinfo.name}
              </p>
              <p className="text-gray-500">
                Seller Email: {product.sellerinfo.email}
              </p>
              <p className="text-gray-500">
                Brand Name: {product.sellerinfo.businessName}
              </p>
            </div>
            <div className="flex justify-between items-center w-[25%]">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaEdit />}
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  aria-label="delete"
                  variant="contained"
                  color="secondary"
                  startIcon={<MdDelete />}
                  onClick={() => handleDeleteModalOpen(product._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button
          onClick={handleOpen}
          leftIcon={<IoIosCube />}
          colorScheme="blue"
        >
          Add Product
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                <Loader />
              </div>
            )}
            <ModalHeader>
              {product._id ? "Edit Product" : "Add Product"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    value={product.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input
                    name="description"
                    type="text"
                    value={product.description}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="Category"
                    value={product.Category}
                    onChange={handleInputChange}
                  >
                    {globalCat.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    type="text"
                    value={product.price}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Brand</FormLabel>
                  <Input
                    name="brand"
                    type="text"
                    value={product.brand}
                    onChange={handleInputChange}
                    placeholder="enter your brandname"
                  />
                </FormControl>

                {/* {inputFields.map((field, index) => (
                  <FormControl key={index}>
                    <FormLabel>Picture {index + 1} (max 1MB)</FormLabel>
                    <Input
                      type="file"
                      onChange={(event) => handleFileChange(index, event)}
                    />
                  </FormControl>
                ))} */}

                {inputFields.map((field, index) => (
                  <FormControl key={index}>
                    <FormLabel>Picture {index + 1} (max 1MB)</FormLabel>
                    <Input
                      type="file"
                      onChange={(event) =>
                        handleFileChange(index, event, "pics")
                      }
                    />
                  </FormControl>
                ))}

                {inputFieldsGltf.map((field, index) => (
                  <FormControl key={index}>
                    <FormLabel>
                      GLTF Model {index + 1} (max 5 files, each max 1MB)
                    </FormLabel>
                    <Input
                      type="file"
                      multiple
                      accept=".glb"
                      onChange={(event) =>
                        handleFileChange(index, event, "gltfModels")
                      }
                    />
                  </FormControl>
                ))}

                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    name="quantity"
                    type="number"
                    value={product.quantity}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Color</FormLabel>
                  <Input
                    name="color"
                    type="text"
                    value={product.color}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Discount Price</FormLabel>
                  <Input
                    name="dprice"
                    type="text"
                    value={product.dprice}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue">
                    {product._id ? "Update Product" : "Add Product"}
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        isOpen={isDeleteModalOpen}
        leastDestructiveRef={undefined}
        onClose={handleDeleteModalClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleDeleteModalClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default SelProducts;
