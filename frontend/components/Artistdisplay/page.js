import React from "react";

export default function Artistdisplay(artistData) {
  return (
    <div class="container mt-4">
      <div id="artistProfile" class="card bg-dark text-white">
        <div class="row no-gutters align-items-center">
          <div class="col-md-3 d-flex justify-content-center">
            <div
              class="rounded-circle overflow-hidden border border-light"
              style="width: 200px; height: 200px;"
            >
              <img
                src={props.spotifySelection.image}
                class="card-img img-fluid"
                alt={props.spotifySelection.name}
              />
            </div>
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h1 class="card-title font-weight-bold">
                {props.spotifySelection.name}
              </h1>
              <p class="card-text">
                Popularity: {props.spotifySelection.popularity}%
              </p>
              <a
                href={props.spotifySelection.spotifyUrl}
                class="btn btn-lg btn-success"
                target="_blank"
                rel="noopener noreferrer"
              >
                Show on Spotify
              </a>
            </div>
          </div>
        </div>
        <div class="spotify-logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"
            alt="Spotify Logo"
            class="spotify-logo"
          />
        </div>
      </div>
    </div>
  );
}
