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
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IoIosCube } from "react-icons/io";
import { LoginContext } from "../ContextProvider/LoginProvider";
import Deletionmodal from "./Deletionmodal";

const Categories = () => {
  const { globalCat, setGloabalCat } = React.useContext(LoginContext);
  const queryClient = useQueryClient();
  const Token = JSON.parse(localStorage.getItem("Token"));
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    pic: "",
  });

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: fetchCategories,
  });

  async function fetchCategories() {
    const response = await axios.get("/categories/getCategories");
    return response.data.data;
  }
  setGloabalCat(data);

  const handleClose = () => {
    setIsOpen(false);
    setIsEditOpen(false); // Close edit modal on close
    setIsDelOpen(false); // Close delete modal on close
    setNewCategory({ name: "", pic: "" });
    setSelectedCategory(null); // Reset selected category
  };

  const handleInputChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewCategory({
      ...newCategory,
      pic: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("pic", newCategory.pic);

    try {
      const response = await axios.post(
        "/categories/postCategory",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      setIsOpen(false);
      alert("Category Added successfully");
      queryClient.invalidateQueries("categories");
      handleClose();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Category not added");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category); 
    setIsEditOpen(true); 
    setNewCategory({
      name: category.name,
      pic: "", 
    });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("pic", newCategory.pic);

    try {
      const response = await axios.put(
        `/categories/updateCategory/${selectedCategory._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const updatedCategory = response.data.data;
      alert("Category Updated successfully");
      queryClient.invalidateQueries("categories");
      handleClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteModalOpen = (category) => {
    setSelectedCategory(category);  
    setIsDelOpen(true); 
  };

  const handleDelete = async (category) => {
    try {
      const response = await axios.delete(
        `/categories/deleteCategory/${selectedCategory._id}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      alert("Category Deleted Successfully");
      queryClient.invalidateQueries("categories");
      handleClose();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
        <h2 className="text-2xl font-bold mb-4 text-white">
          Total Categories = {data.length}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 overflow-y-scroll overflow-x-hidden scrollbar pb-10 w-full h-[100vh]">
        {data.map((category) => (
          <div
            key={category._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between"
          >
            <div className="w-[25%]">
              <img src={category.pic} className="w-35 h-28 contain" alt="" />
            </div>
            <div className="w-[25%]">
              <p>{category.name}</p>
            </div>

            <div className="flex justify-between items-center w-[25%]">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaEdit />}
                  onClick={() => handleEdit(category)} // Edit button
                >
                  Edit
                </Button>
                <Button
                  aria-label="delete"
                  variant="contained"
                  color="secondary"
                  startIcon={<MdDelete />}
                  onClick={() => handleDeleteModalOpen(category)} // Delete button
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
          className="mb-10"
          onClick={() => setIsOpen(true)}
          leftIcon={<IoIosCube />}
          colorScheme="blue"
        >
          Add Category
        </Button>

        {/* Add Delete Confirmation Modal */}
        {/* <Modal isOpen={isDelOpen} onClose={handleClose} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Category</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this category?</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
        <Deletionmodal
        isOpen={isDelOpen}
        onClose={() => setIsDelOpen(false)}
        onDelete={handleDelete}
        categoryName={selectedCategory ? selectedCategory.name : ""}
      />

        {/* Add Add Category Modal */}
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Category</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    value={newCategory.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Picture (max 1MB)</FormLabel>
                  <Input type="file" onChange={handleFileChange} />
                </FormControl>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue">
                    Add Category
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Add Edit Category Modal */}
        <Modal isOpen={isEditOpen} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Category</ModalHeader>
            <ModalBody>
              <form onSubmit={handleUpdate}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    value={newCategory.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Picture (max 1MB)</FormLabel>
                  <Input type="file" onChange={handleFileChange} />
                </FormControl>

                <ModalFooter>
                  <Button type="submit" colorScheme="blue">
                    Update Category
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Categories;
