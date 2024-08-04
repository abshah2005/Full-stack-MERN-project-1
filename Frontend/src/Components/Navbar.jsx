import React,{useContext, useState,useEffect} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { Link, json, useLocation } from "react-router-dom";
import { LoginContext } from "../ContextProvider/LoginProvider";
import Snavi from "./Snavi";
import Cartside from "./Cartside";
import { Avatar, Button } from "@chakra-ui/react";
import { LoaderIcon } from "react-hot-toast";
import Modallogout from "./Modallogout";

const Navbar = () => {
  const{setIsadmin,isloggedin,user,setuser,Brands}=useContext(LoginContext)
  const location=useLocation();
  const [scrolled, setScrolled] = useState(false);
  const Token=JSON.parse(localStorage.getItem("Token"));
  // const User=JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  
  return (
    <nav 
    className={`w-full h-20 flex-center fixed top-0 transition-all z-10 shadow-lg hover:bg-white ${
      scrolled? "bg-white shadow-md" : "bg-white"
    }`}
     >
    <div className="flex sm:justify-around justify-between w-[90%]">
      <div className="block sm:hidden md:hidden text-2xl pt-7 text-black">
        
        <Snavi />
      </div>
      <div className="flex items-center justify-center">
        <img
          className="w-36 pt-3 h-20"
          src="../public/abdullahlogo.svg"
          width={40}
          height={40}
          alt=""
        />
        <p className="text-xl font-semibold">Furniture <span className="text-yellow-500">Flare</span></p>
      </div>
      <div className="hidden sm:flex w-[50%] justify-between items-center text-sm lg:flex md:flex xl:flex">
        <div className={`text-black hover:underline cursor-pointer flex items-center text-sm  ${location.pathname === "/" ? "underline" : ""}`}>
          <Link to="/">Home </Link>
        </div>
        <div className={`text-black hover:underline cursor-pointer flex items-center text-sm ${location.pathname === "/Categories" ? "underline" : ""}`}>
          <Link to={"/AllCategories"}>Categories</Link>
        </div>
        <div className={`text-black hover:underline cursor-pointer flex items-center text-sm ${location.pathname === "/Categories" ? "underline" : ""}`}>
          <Link to={"/Brands"}>Brands</Link>
        </div>
           <div className="flex items-center justify-center gap-3 cursor-pointer">
            <Avatar src={user?.profilePic} />
            <div className="flex flex-col   justify-center">
            <p className="pl-1">{user?.username}</p>
            {
             user.role==="seller"? 
             <Link to={"/SellerDashboard"}>  <Button size='xs'>Seller Dashboard
              </Button>
              </Link> : user.role==="admin"?
              
              <Link to={"/admin/dashboard"}>
              <Button size='xs'>
              Admin Dashboard
             </Button>
              </Link> :Token && <Link to={"/SellerApplication"}>
              <Button size='xs'>
              Become a Seller
             </Button>
              </Link>
              
            }
             
            </div>

           </div>
        

        <div className={`text-black hover:underline cursor-pointer flex  items-center text-sm ${location.pathname === "/Login" ? "underline" : ""}`}>
          {Token?(
            <div ><Modallogout /></div>
          ):(
            <div><Link to={"/Login"}>Login/Signup</Link></div>
          )}
        </div>

      </div>
      <div className="text-black pt-8 pl-2 relative  text-xl sm:relative">
        
        <Cartside />
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
