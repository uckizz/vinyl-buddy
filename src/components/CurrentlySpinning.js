import React from "react";

export default function CurrentlySpinning(props) {
  return (
    <div className="currently-spinning">
      <h2>Currently Spinning</h2>
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
