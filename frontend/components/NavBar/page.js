"use client";
import React, { useState } from "react";

export default function Page() {
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // Add any additional logic you may need when an item is clicked
  };

  const isActive = (itemName) => {
    return itemName === activeItem ? "text-green-500 font-bold" : "";
  };
  return (
    <nav className="bg-gradient-to-r from-green-400 to-black shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse text-white"
        >
          <img
            src="/images/Spotify-Logo.svg.webp"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Searcher
          </span>
        </a>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
          <li>
            <a
              href="#"
              className={`block py-2 px-3 text-white rounded md:p-0 md:hover:text-green-300 ${isActive(
                "Home"
              )}`}
              aria-current="page"
              onClick={() => handleItemClick("Home")}
            >
              Artist
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block py-2 px-3 text-white rounded md:p-0 md:hover:text-green-300 ${isActive(
                "About"
              )}`}
              onClick={() => handleItemClick("About")}
            >
              Song
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block py-2 px-3 text-white rounded md:p-0 md:hover:text-green-300 ${isActive(
                "Services"
              )}`}
              onClick={() => handleItemClick("Services")}
            >
              Album
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
