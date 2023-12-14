"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8002/api/test";

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
