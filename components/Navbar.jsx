"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="flex justify-between items-center h-16 md:hidden">
          {/* Hamburger Menu (Leftmost on mobile) */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo (Centered on mobile) */}
          <div className="flex-1 flex justify-center">
            <img src="./logo.png" alt="Betsson Logo" className="h-8 w-auto" />
          </div>

          {/* Language Selector (Rightmost on mobile) */}
          <div className="relative inline-block text-left">
            <select className="border border-gray-300 rounded-md text-gray-700 px-3 py-2 text-sm">
              <option>EN</option>
              <option>ES</option>
              <option>FR</option>
            </select>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo (Left on desktop) */}
          <div className="flex items-center">
            <img src="./logo.png" alt="Betsson Logo" className="h-8 w-auto" />
          </div>

          {/* Navigation Links (Center on desktop) */}
          <div className="flex items-center space-x-4">
            <a
              href="/home"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/online-game"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Online Game
            </a>
            <a
              href="/offers"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Offers
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </a>
          </div>

          {/* Language Selector (Right on desktop) */}
          <div className="relative inline-block text-left">
            <select className="border border-gray-300 rounded-md text-gray-700 px-3 py-2 text-sm">
              <option>EN</option>
              <option>ES</option>
              <option>FR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/home"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/online-game"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Online Game
            </a>
            <a
              href="/offers"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Offers
            </a>
            <a
              href="/about-us"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </a>
            <a
              href="/contact-us"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
