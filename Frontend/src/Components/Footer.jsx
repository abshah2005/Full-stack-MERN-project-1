import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaCommentAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 min-h-[30vh] text-white py-10">
      <div className="container  mx-auto px-4">
        <div className="flex flex-col items-center md:flex-col md:justify-between">

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Follow Us on Social Media</h2>
            <div className="flex space-x-4 justify-center">
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Contact Information and Customer Service */}
          <div className="w-full md:w-[100%] flex justify-center md:justify-around items-center mt-10 ">
            <div className="flex flex-col items-center md:items-center justify-center md:space-y-4 space-x-10 md:flex-row lg:flex-row">
              <div className="flex flex-col items-center justify-center w-full md:w-[30%] lg:w-[30%] relative left-0 lg:left-0 md:left-0">
                <FaWhatsapp size={34} className="text-green-400 mb-2" />
                <h3 className="text-xl font-bold mt-1 mb-4">WhatsApp Us</h3>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 "
                >
                 ph: 03174213756
                </a>
              </div>
              <div className="flex flex-col items-center justify-center w-full md:w-[30%] lg:w-[30%] mt-10 lg:mt-0 md:mt-0 relative -left-5 lg:left-0 md:left-0">
                <FaEnvelope size={24} className="text-gray-400 mb-0" />
                <h3 className="text-xl font-bold mt-2">E-Mail</h3>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  info@FurnitureFlare.com
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  We will respond as quickly as we can.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center w-full md:w-[50%] lg:w-[50%] mt-10 lg:mt-0 md:mt-0 relative -left-5 lg:left-0 md:left-0">
                <FaCommentAlt size={24} className="text-gray-400 mb-2" />
                <h3 className="text-xl font-bold mb-2">Customer Service</h3>
                <p className="text-sm text-gray-500 mb-2">Mon - Fri, 9 am - 6 pm</p>
                <p className="text-sm text-gray-500">Sat, 9 am - 2 pm</p>
                {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                  Get In Touch
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
