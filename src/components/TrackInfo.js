import React from "react";

export default function TrackInfo(props) {
  return (
    <div>
      <h3>Artist: {props.trackInfo.artist}</h3>
      <h3>Album: {props.trackInfo.album}</h3>
      <h3>Song: {props.trackInfo.song}</h3>
      <img src={props.trackInfo.cover}></img>
    </div>
  );
}
