"use client";
import React, { useState, useEffect } from "react";
import { Navigation } from "../components/NavBar/page";
import SearchBar from "../components/Searchbar/page";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Artist");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8002/api/spotify/artist";

      try {
        const response = await Promise.race([
          fetch(url),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000) // 5 seconds timeout
          ),
        ]);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navigation selectedTab={selectedTab} onTabChange={handleTabChange} />
      <SearchBar selectedTab={selectedTab} />
    </div>
  );
}
