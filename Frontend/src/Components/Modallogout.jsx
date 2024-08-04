import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { LoginContext } from "../ContextProvider/LoginProvider";

const Modallogout = () => {
    const{setIsadmin,isloggedin,user,setuser}=useContext(LoginContext)
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <div
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Logout
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <p>Do you really want to Logout?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>{
                onClose(true);
                localStorage.removeItem("Token");
                localStorage.removeItem("User");
                localStorage.removeItem("role");
                setuser({
                  username: "guest",
                  role: "customer",
                  email: "guest@123.com",
                });
                setrole(null);
                setIsadmin(false);
                alert("Logged out successfully");
                
            }}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modallogout;
