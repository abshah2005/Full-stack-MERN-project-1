import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
  Divider,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, json } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginContext } from "../ContextProvider/LoginProvider";

const getRandomInt = (min, max) => {
  return Math.ceil(Math.random() * (max - min + 1) + min - 1);
};

const getRandomAlphabets = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const rand = getRandomInt(0, 10) * 100;
const randomAlphabets = getRandomAlphabets(5 + Math.floor(Math.random() * 2));

const UserInfo = ({ user, onLogout, isloggedin, Token }) => {
  return (
    <div className="user-info flex items-center justify-between mt-5 mb-10 pt-5">
      {Token ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center">
            <Avatar className="mr-4" src={user?.profilePic} />
            <div className="text-black">
              <div className="font-bold text-xl">{user.username}</div>
              <div className="text-sm">{user.email}</div>
              <div className="text-sm italic">{user.role}</div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div>
              <Button onClick={onLogout}>Logout</Button>
            </div>
            <div className="mt-2">
              {user.role === "admin" ? (
                <Button colorScheme="blue">
                  <Link to={"/admin/dashboard"}>Admin dashboard</Link>
                </Button>
              ) : user.role === "seller" ? (
                <Button colorScheme="blue">
                  <Link to={"/SellerDashboard"}>Seller dashboard</Link>
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full text-black">
          <div className="flex item-center justify-center">
            <Avatar className="mr-4 mt-3" />
            <div className="text-black">
              <div className="font-bold text-xl">
                Guest{randomAlphabets}
                {rand}{" "}
              </div>
              <div className="text-sm">
                Guest{randomAlphabets}
                {rand}@app.com
              </div>
              <div className="text-sm italic">Customer</div>
            </div>
          </div>

          <div>
            <Button as={Link} to="/Login">
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Snavi = () => {
  const {
    user,
    setuser,
    setrole,
    role,
    isadmin,
    setIsadmin,
    isloggedin,
    setIsloggedin,
  } = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Token = JSON.parse(localStorage.getItem("Token"));

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    localStorage.removeItem("role");
    setuser({
      name: "guest",
      role: "customer",
      email: "guest@123.com",
    });
    setrole(null);
    setIsadmin(false);
    alert("Logged out successfully");
    setIsloggedin(false);
  };

  return (
    <>
      <div className="text-3xl cursor-pointer" onClick={onOpen}>
        <GiHamburgerMenu />
      </div>

      <Drawer size="md" placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className="drawer-content pt-5 bg-black">
          <DrawerCloseButton className="mt-8 text-3xl" />
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="drawer-header text-2xl font-bold flex justify-start items-center pt-5 pl-5"
          >
            Furniture<span className="text-yellow-500">Flare</span>
          </motion.div>

          <DrawerBody className="scrollbar">
            <Divider className="mt-5 font-bold bg-gray-800" />
            <UserInfo
              user={user}
              onLogout={handleLogout}
              isloggedin={isloggedin}
              Token={Token}
            />
            <Divider className="font-bold bg-gray-800" />
            <ul className="drawer-body mt-5">
              {[
                { text: "Home", path: "/" },
                // { text: "Products", path: "/Products" },
                { text: "Categories", path: "/AllCategories" },
                {text:"Brands",path:"/Brands"},
                { text: "Return Policy", path: "/returnPolicy" },
                // { text: "Login", path: "/Login" },
                // { text: "Signup", path: "/Signup" },
              ].map((item, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                  key={index}
                  className="text-2xl p-4 pl-1 hover:text-black transition duration-300 ease-in-out"
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="block w-full text-left hover:underline"
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
              {Token !== null && user.role === "customer" ? (
                <motion.li
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 6 * 0.1,
                  }}
                  className="text-2xl p-4 pl-1 hover:text-black transition duration-300 ease-in-out"
                >
                  <Link
                    onClick={onClose}
                    className="block w-full text-left hover:underline"
                    to={"/SellerApplication"}
                  >
                    Become a Seller
                  </Link>
                </motion.li>
              ) : (
                ""
              )}

              {Token !== null ? (
                <motion.li
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 7 * 0.1,
                  }}
                  className="text-2xl p-4 pl-1 hover:text-black transition duration-300 ease-in-out"
                >
                  <Link
                    onClick={onClose}
                    className="block w-full text-left hover:underline"
                  >
                    Logout
                  </Link>
                </motion.li>
              ) : (
                <>
                <motion.li
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 7 * 0.1,
                  }}
                  className="text-2xl p-4 pl-1 hover:text-black transition duration-300 ease-in-out"
                >
                  <Link
                    onClick={onClose}
                    className="block w-full text-left hover:underline"
                  >
                    Login
                  </Link>
                </motion.li>
                <motion.li
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 8 * 0.1,
                }}
                className="text-2xl p-4 pl-1 hover:text-black transition duration-300 ease-in-out"
              >
                <Link
                  onClick={onClose}
                  className="block w-full text-left hover:underline"
                >
                  Signup
                </Link>
              </motion.li>
                </>
              )}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Snavi;
