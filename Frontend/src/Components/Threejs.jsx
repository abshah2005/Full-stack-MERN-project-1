import React from "react";
import Sofaim from "./Sofaim";

const Threejs = () => {
  return (
    <div className="bg-black w-full min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
      <div className="model  h-auto  flex justify-center items-center">
        <div className="w-full flex  h-full text-white relative ">
          
          <Sofaim />
        </div>
      </div>
      
      <div className="text  h-auto  flex justify-center items-center">
        <div className="w-full text-white font-bold">
        Get ready to ignite your space with FurnitureFlare! We're not just a furniture brand, we're a movement. We're about sparking creativity, fueling imagination, and setting your home ablaze with style. Our furniture is more than just pieces, it's a reflection of your personality, your vibe, and your flair. At FurnitureFlare, we're passionate about helping you create a space that's truly on fire!
        </div>
      </div>
    </div>
  );
};

export default Threejs;
