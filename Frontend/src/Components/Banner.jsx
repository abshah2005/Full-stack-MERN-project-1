import React, { useEffect, useState } from "react";

const Banner = () => {
  const [issmaller, setIssmaller] = useState(false);
  const [link, setLink] = useState(
    "https://baroque.pk/cdn/shop/files/MAin_BAnner54.jpg?v=1720175960&width=1400"
  );
  useEffect(() => {
    const handleresize = () => {
      if (window.innerWidth < 628) {
        setIssmaller(true);
        setLink(
          "https://baroque.pk/cdn/shop/files/mobilebanner_63_27eb31c7-5114-4417-bb10-27e48198057d.jpg?v=1720175966&width=600"
        );
      } else {
        setIssmaller(false);
        setLink(
          "https://baroque.pk/cdn/shop/files/MAin_BAnner54.jpg?v=1720175960&width=1400"
        );
      }
    };
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  });

  return (
    <section className="w-full max-h-[70vh] bg-gray-400 overflow-hidden sm:h-auto ">
      <img src={link} className="w-full h-full " alt="" />
    </section>
  );
};

export default Banner;
