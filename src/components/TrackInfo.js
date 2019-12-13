import React from "react";
import CurrentlySpinning from "./CurrentlySpinning";
import InfoWikipedia from "./InfoWikipedia";
import InfoDiscogs from "./InfoDiscogs";

export default function TrackInfo(props) {
  return (
    <div>
      <div className="main-trackinfo">
        <InfoWikipedia {...props} />
        <CurrentlySpinning {...props} />
        <InfoDiscogs {...props} />
      </div>
      <button
        className="ui inverted basic button identify-button"
        onClick={props.refresh}
      >
        Refresh
      </button>
      <p>Auto refreshing in: 60</p>
    </div>
  );
}
