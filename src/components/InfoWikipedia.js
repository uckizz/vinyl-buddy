import React from "react";

export default function InfoWikipedia(props) {
  return (
    <div className="info-wikipedia">
      <img
        className="site-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Wikipedia_Logo_1.0.png/220px-Wikipedia_Logo_1.0.png"
        alt="wiki-logo"
      ></img>
      <p>
        <strong>Eric Johnson (born August 17, 1954)</strong> is an American
        guitarist, vocalist, composer, and multi-instrumentalist. His 1990 album
        Ah Via Musicom was certified platinum by the RIAA, and the single
        "Cliffs of Dover" won the Grammy Award for Best Rock Instrumental
        Performance.
      </p>
      <a href="#">Find out more on Wikipedia</a>
    </div>
  );
}
