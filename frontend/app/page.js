"use client";
import React, { useState, useEffect } from "react";
import { Navigation } from "../components/NavBar/page";
import SearchBar from "../components/Searchbar/page";
import ArtistDisplay from "../components/Artistdisplay/page";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Artist");
  const [searchQuery, setSearchQuery] = useState(" ");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  let spotifyData = {
    name: "Artist Name",
    popularity: 0,
    image: "/images/Spotify-Logo.svg.webp",
    spotifyUrl: "https://open.spotify.com/",
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
      <SearchBar
        selectedTab={selectedTab}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <ArtistDisplay artist={spotifyData} />
      <div>
        <h2>Search Query:</h2>
        <p>{searchQuery}</p>
      </div>
    </div>
  );
}
