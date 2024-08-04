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
  IoIosBook,
} from "react-icons/io";
import Sidebar from "./Sidebar";
import Products from "./Products";
import Orders from "./Orders";
import Sellers from "./Sellers";
import Confirmed from "./Confirmed";
import Sales from "./Sales";
import Application from "./Application";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SelProducts from "./SelProducts";
import Categories from "./Categories";

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
    title: "Delivered Orders",
    icon: <IoIosCheckmarkCircle />,
  },
  {
    id: 4,
    title: "Sales",
    icon: <IoIosCash />,
  },
  {
    id: 5,
    title: "Categories",
    icon: <IoIosBook />,
  },
];

const content = {
  Products: <SelProducts />,
  Orders: <Orders />,
  "Delivered Orders": <Confirmed />,
  Sales: <Sales />,
  Categories: <Categories />,
};

const SellerDashboard = () => {
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
        className={`w-full h-20 bg-slate-800 text-center flex items-center content-center ${
          smallscreen ? "justify-between" : "justify-center"
        }`}
      >
        {smallscreen ? (
          <Sidebar items={items} handleLinkClick={handleLinkClick} />
        ) : null}
        <div className="flex">
          <MdDashboard className="text-3xl text-white" />
          <p className="text-2xl font-semibold text-white">Seller Dashboard</p>
        </div>
        <div></div>
      </div>
      <div className="flex w-full h-screen bg-slate-500 z-1">
        <div
          className={`${
            smallscreen ? "hidden" : "block"
          } w-[20%] bg-green-400 greendiv`}
        >
          <div
            className="bg-white w-full h-screen overflow-y-scroll scrollbar overflow-x-hidden transition-all ease-in-out"
          >
            <div className="sidebar-content text-black">
              <h2 className="text-black text-2xl pl-5 pt-5 font-bold mb-6">
                Dashboard
              </h2>
              <hr />
              <ul>
                {items.map((part) => (
                  <li
                    key={part.id}
                    className={`mb-4 p-5 cursor-pointer flex items-center ${
                      activeLink === part.title ? "bg-blue-800 text-white" : ""
                    }`}
                    onClick={() => {
                      handleLinkClick(part.title);
                    }}
                  >
                    <div className="mr-3 text-4xl">{part.icon}</div>
                    <span className="text-lg">{part.title}</span>
                  </li>
                ))}
                <li className="pl-5">
                  <Button className="bg-white text-black border border-black">
                    <IoIosHome />
                    <Link to={"/"}>Home</Link>{" "}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${
            smallscreen ? "w-full" : "w-[80%]"
          } bg-gray-500 flex justify-center scrollbar overflow-y-scroll overflow-x-hidden p-5`}
        >
          {content[activeLink]}
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
