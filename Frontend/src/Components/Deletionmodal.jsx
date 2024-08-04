import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const Deletionmodal = ({ isOpen, onClose, onDelete, categoryName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete the category {categoryName}?</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Deletionmodal;
