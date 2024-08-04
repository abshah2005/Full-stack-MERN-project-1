import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";

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

const ProductsCarousel = ({ pics }) => {
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
    <div className="slider-container1 w-full h-full">
      <Slider {...settings}>
        {pics.map((src, index) => (
          <div key={index} className="h-full">
            <img className="w-full h-full object-contain" src={src} alt={`pic-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsCarousel;
