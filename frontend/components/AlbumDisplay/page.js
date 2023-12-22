"use client";
import React, { useState } from "react";
import Modal from "react-modal";

const AlbumDisplay = ({ album }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cover, name, spotify_url, release_date, artist } = album;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a
        href={spotify_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-zinc-900 rounded-lg p-4 text-white w-60 mb-4 mx-4 mt-4 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
      >
        <img
          className="rounded-full w-24 h-24 mx-auto mb-4"
          src={cover}
          alt={name}
        />
        <h2 className="text-center text-xl mb-2">{name}</h2>
        <p className="text-center text-sm">: {popularity}</p>
      </a>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Album Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            backgroundColor: "rgb(24, 24, 27)",
            borderColor: "rgb(24, 24, 27)",
            boxShadow: "0 10px 20px rgba(34, 197, 94, 0.4)",
            width: "60%",
            height: "70%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            padding: "20px",
          },
        }}
      >
        <div className="flex mb-4" style={{ caretColor: "transparent" }}>
          <div className="flex flex-col items-center mr-4">
            <img
              className="rounded-full w-64 h-64 shadow-md shadow-zinc-800"
              src={cover}
              alt={name}
            />
            <div className="mt-4">
              <h2 className="text-4xl text-white mb-2">{name}</h2>{" "}
              <p className="text-2xl text-white">Popularity: {popularity}</p>{" "}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-2xl text-white mb-4">
              Release Date: {release_date}
            </p>{" "}
          </div>
        </div>
        <a
          href={spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-green-500 underline mb-4"
        >
          View on Spotify
        </a>
        <button
          onClick={closeModal}
          className="text-2xl text-green-500 underline mb-4"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default AlbumDisplay;
