import React from "react";
import Slider from "react-slick";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};

const ReactSlick = ({ pics }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    waitForAnimate: false,
  };

  return (
    <div className="">
      <Slider {...settings}>
        {pics.map((src, index) => (
          <div key={index}>
            <img className="w-full h-full object-contain" src={src} alt={`pic-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReactSlick;
