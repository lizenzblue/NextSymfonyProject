"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        "http://127.0.0.1:8000/api/spotify/artist",
        "http://127.0.0.1:44057/api/spotify/artist",
      ];

      const requests = urls.map(async (url) => {
        try {
          const response = await Promise.race([
            fetch(url),
            new Promise(
              (_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), 5000) // 5 seconds timeout
            ),
          ]);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      });

      try {
        await Promise.all(requests);
      } catch (error) {
        console.error("Failed to fetch data from all URLs");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>{data.message}</h1>
          <p>{data.path}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
