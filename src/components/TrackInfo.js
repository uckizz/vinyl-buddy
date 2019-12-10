import React from "react";

export default function TrackInfo(props) {
  return (
    <div className="track-info">
      <img
        className="cover-image"
        src={props.trackInfo.cover}
        alt="album-cover"
      ></img>
      <h3>
        {props.trackInfo.artist} - {props.trackInfo.song}
      </h3>
      <h3>{props.trackInfo.album}</h3>
    </div>
  );
}
