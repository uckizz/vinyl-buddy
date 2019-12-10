import React from "react";

export default function TrackInfo(props) {
  return (
    <div className="track-info">
      <h1>Currently Spinning</h1>
      <img
        className="cover-image"
        src={props.trackInfo.cover}
        alt="album-cover"
      ></img>
      <h2>{props.trackInfo.artist} </h2>
      <h3>{props.trackInfo.song}</h3>
      <h4>Album: {props.trackInfo.album}</h4>
      <p className="wrong-info" onClick={() => alert("todo")}>
        Wrong info?
      </p>
    </div>
  );
}
