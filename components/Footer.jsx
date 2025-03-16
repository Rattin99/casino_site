import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 px-4 relative overflow-hidden">
      {/* Background poker chips */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* We're using empty divs with rounded borders as poker chips in the background */}
        <div className="w-16 h-16 rounded-full border-4 border-teal-200 opacity-20 absolute top-10 right-20"></div>
        <div className="w-20 h-20 rounded-full border-4 border-green-200 opacity-20 absolute bottom-10 right-10"></div>
        <div className="w-14 h-14 rounded-full border-4 border-purple-300 opacity-20 absolute top-20 left-8"></div>
        <div className="w-12 h-12 rounded-full border-4 border-red-300 opacity-20 absolute bottom-4 right-1/4"></div>
      </div>

      {/* Footer content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center z-10 relative">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <img src="/logo.png" alt="Betsson" className="h-8" />
        </div>

        {/* Navigation & Contact (stacked on mobile, side by side on desktop) */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          {/* Navigation links */}
          <div className="flex flex-col md:flex-row md:space-x-6 mb-4 md:mb-0">
            <a href="#" className="mb-2 md:mb-0 hover:text-orange-400">
              About Us
            </a>
            <a href="#" className="mb-2 md:mb-0 hover:text-orange-400">
              Contact
            </a>
            <a href="#" className="mb-2 md:mb-0 hover:text-orange-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-400">
              Terms & Service
            </a>
          </div>

          {/* Contact information */}
          <div className="mb-6 md:mb-0">
            <p className="md:text-right">
              <span className="text-gray-300">Address:</span> 24/7 Rose Avenue,
              London
            </p>
            <p className="md:text-right">
              <span className="text-gray-300">Email:</span> vipoffers@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Social icons & copyright */}
      <div className="container mx-auto mt-8 flex flex-col md:flex-row justify-between items-center z-10 relative">
        {/* Copyright on mobile: bottom, on desktop: left */}
        <div className="order-2 md:order-1 text-sm text-gray-400 mt-6 md:mt-0">
          Copyright © 2023, Modiag - All Right Reserved
        </div>

        {/* Social icons on mobile: top, on desktop: right */}
        <div className="order-1 md:order-2 flex space-x-3">
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
