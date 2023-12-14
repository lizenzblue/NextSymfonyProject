"use client";
import React, { useState } from "react";

export default function Page() {
  const [activeItem, setActiveItem] = useState("Artist");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const isActive = (itemName) => {
    return itemName === activeItem ? "text-green-500 font-bold" : "";
  };
  return (
    <nav className="bg-gradient-to-r from-green-400 to-black shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse text-white"
        >
          <img
            src="/images/Spotify-Logo.svg.webp"
            className="h-8"
            alt="Spotify Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Searcher
          </span>
        </a>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
          <li>
            <a
              href="javascript:void(0)"
              className={`block py-2 px-3 text-white rounded md:p-0 md:hover:text-green-300 ${isActive(
                "Artist"
              )}`}
              onClick={() => handleItemClick("Artist")}
            >
              Artist
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`block py-2 px-3 text-white rounded md:p-0 md:hover:text-green-300 ${isActive(
                "Song"
              )}`}
              onClick={() => handleItemClick("Song")}
            >
              Song
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`block py-2 px-3 text-white rounded md:p-0 md:hover:text-green-300 ${isActive(
                "Album"
              )}`}
              onClick={() => handleItemClick("Album")}
            >
              Album
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
