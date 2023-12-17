import React from "react";

const ArtistDisplay = ({ artist }) => {
  console.log(artist);
  if (!artist) {
    return null; // or some fallback UI
  }

  return (
    <div className="bg-transparent rounded-lg p-4 text-white w-64">
      <img
        className="rounded-full w-16 h-16 mx-auto mb-4"
        src={artist.image}
        alt={artist.name}
      />
      <h2 className="text-center text-lg mb-2">{artist.name}</h2>
      <p className="text-center text-sm">{artist.genre}</p>
    </div>
  );
};
export default ArtistDisplay;
