"use client";
import React, { useState } from "react";

const Navigation = ({ selectedTab, onTabChange }) => {
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
            Searchify
          </span>
        </a>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
          <li>
            <a
              href="#"
              className={`block py-2 px-3  rounded md:p-0 ${
                selectedTab === "Artist" ? "text-green-500" : "text-white"
              }`}
              onClick={() => onTabChange("Artist")}
              style={{ caretColor: "transparent" }}
            >
              Artist
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block py-2 px-3 rounded md:p-0 ${
                selectedTab === "Tracks" ? "text-green-500" : "text-white"
              }`}
              onClick={() => onTabChange("Tracks")}
              style={{ caretColor: "transparent" }}
            >
              Tracks
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`block py-2 px-3  rounded md:p-0 ${
                selectedTab === "Album" ? "text-green-500" : "text-white"
              }`}
              onClick={() => onTabChange("Album")}
              style={{ caretColor: "transparent" }}
            >
              Album
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Navigation };
