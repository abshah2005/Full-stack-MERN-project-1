import React from "react";
import { FaForward } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";

const Texts = () => {
  return (
    <div className="bg-[#2d2d2d]  text-white w-full min-h-screen   lg:-mt-0  grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  pb-10 lg:pb-0 md:pb-0">
      <div className="flex  justify-center items-center pb-10 md:pb-0 lg:pb-0">
        <img src="../public/Whitesvg.svg" alt="" className="" />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className=" -mt-36 lg:-mt-0 md:-mt-0 text-3xl font-bold w-[50%] lg:w-full md:w-full text-center ">
        "<span className="text-#8da646">Furniture Flare:</span>  Redefining the way you shop."
        </div>
        <div className="pt-6">
          <button className="p-3 font-bold rounded-md bg-[#8da646] flex justify-center items-center text-2xl ">
            Read more{" "}
            <div className="text-2xl pt-1 pl-2">
              <IoIosArrowDropright />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Texts;
