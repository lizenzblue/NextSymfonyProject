"use client";
import React, { useState } from "react";

const SearchBar = ({ selectedTab, onSearchQueryChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    onSearchQueryChange(newSearchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center justify-center mt-8"
    >
      <div className="relative rounded-full">
        <input
          type="text"
          placeholder={`Search ${selectedTab}...`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className={`py-2 px-4 pr-10 bg-transparent rounded-full focus:outline-none focus:ring-0 border border-white ${
            isSearchFocused ? "focus:border-green-500" : ""
          } text-white`}
          style={{ caretColor: isSearchFocused ? "auto" : "transparent" }}
        />
        <button
          type="submit"
          className={`absolute inset-y-0 right-0 px-3 bg-transparent rounded-full focus:outline-none ${
            isSearchFocused ? "text-white" : "text-green-500"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5-5m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
