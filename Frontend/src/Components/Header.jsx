import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import {
  IoIosCube,
  IoIosListBox,
  IoMdPeople,
  IoIosCheckmarkCircle,
  IoIosCash,
  IoMdAlert,
  IoIosHome,
  IoIosBookmark,
} from "react-icons/io";
import Sidebar from "./Sidebar";
import Products from "./Products";
import Orders from "./Orders";
import Sellers from "./Sellers";
import Confirmed from "./Confirmed";
import Sales from "./Sales";
import Application from "./Application";
import Categories from "./Categories";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "Products",
    icon: <IoIosCube />,
  },
  {
    id: 2,
    title: "Orders",
    icon: <IoIosListBox />,
  },
  {
    id: 3,
    title: "Sellers",
    icon: <IoMdPeople />,
  },
  {
    id: 4,
    title: "Categories",
    icon: <IoIosBookmark />,
  },
  {
    id: 5,
    title: "Delivered Orders",
    icon: <IoIosCheckmarkCircle />,
  },
  {
    id: 6,
    title: "Sales",
    icon: <IoIosCash />,
  },
  {
    id: 7,
    title: "Applications",
    icon: <IoMdAlert />,
  },
];
const content = {
  Products: <Products />,
  Orders: <Orders />,
  Sellers: <Sellers />,
  Categories:<Categories />,
  "Delivered Orders": <Confirmed />,
  Sales: <Sales />,
  Applications: <Application />,
};

const Header = () => {
  // const [smallscreen, setSmallscreen] = useState(false);
  // const [activeLink, setActiveLink] = useState("Products");
  // const handlescreen = () => {
  //   if (window.innerWidth < 750) {
  //     setSmallscreen(true);
  //   } else {
  //     setSmallscreen(false);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("resize", handlescreen);
  //   return () => {
  //     removeEventListener("resize", handlescreen);
  //   };
  // });

  const [smallscreen, setSmallscreen] = useState(window.innerWidth < 750);
  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeLink") || "Products";
  });

  const handlescreen = () => {
    setSmallscreen(window.innerWidth < 750);
  };

  useEffect(() => {
    handlescreen(); 
    window.addEventListener("resize", handlescreen);
    return () => {
      window.removeEventListener("resize", handlescreen);
    };
  }, []);


  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div
        className={`w-full h-20 bg-slate-800   text-center flex items-center content-center ${
          smallscreen ? "justify-between" : "justify-center"
        }  `}
      >
        {smallscreen ? (
          <Sidebar items={items} handleLinkClick={handleLinkClick} />
        ) : (
          ""
        )}
        <div className="flex">
          <MdDashboard className="text-3xl text-white" />
          <p className="text-2xl font-semibold text-white">Admin Dashboard</p>
        </div>
        <div></div>
      </div>
      <div className="flex w-full h-screen bg-slate-500 z-1">
        <div
          className={`${
            smallscreen ? "hidden" : "block"
          } w-[20%] bg-green-400 greendiv `}
        >
          <div
            className={` bg-white w-full h-screen overflow-y-scroll scrollbar overflow-x-hidden   transition-all ease-in-out `}
          >
            <div className="sidebar-content   text-black">
              <h2 className="text-black text-2xl pl-5 pt-5 font-bold mb-6 ">
                Dashboard
              </h2>
              <hr />

              <ul>
                
                {items.map((part) => (
                  <li
                    key={part.id}
                    className={`mb-4 p-5 cursor-pointer flex items-center ${
                      activeLink === part.title ? "bg-blue-800 text-white" : ""
                    } `}
                    onClick={() => {
                      handleLinkClick(part.title);
                    }}
                  >
                    <div className="mr-3 text-4xl">{part.icon}</div>
                    <span className="text-lg">{part.title}</span>
                  </li>
                ))}
               <li className=" pl-5">
                    <Button className="bg-white text-black border border-black"><IoIosHome/><Link to={"/"}>
                    Home</Link> </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${
            smallscreen ? "w-full" : "w-[80%]"
          } bg-gray-500  flex justify-center scrollbar overflow-y-scroll overflow-x-hidden p-5`}
        >
          {content[activeLink]}
        </div>
      </div>
    </>
  );
};

export default Header;
