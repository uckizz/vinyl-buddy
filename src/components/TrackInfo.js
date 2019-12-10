import React from "react";
import CurrentlySpinning from "./CurrentlySpinning";
import InfoWikipedia from "./InfoWikipedia";
import InfoDiscogs from "./InfoDiscogs";

export default function TrackInfo(props) {
  console.log(props);
  return (
    <div className="main-trackinfo">
      <InfoWikipedia {...props} />
      <CurrentlySpinning {...props} />
      <InfoDiscogs {...props} />
    </div>
  );
}
