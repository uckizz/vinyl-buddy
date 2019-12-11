import React from "react";
import Parser from "html-react-parser";

export default function InfoWikipedia(props) {
  return (
    <div className="info-wikipedia">
      <img
        className="site-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Wikipedia_Logo_1.0.png/220px-Wikipedia_Logo_1.0.png"
        alt="wiki-logo"
      ></img>
      {props.wikiInfo === "" ? (
        <div className="ui active centered inline loader massive loading-spinner center"></div>
      ) : (
        <div>
          <p>{Parser(props.wikiInfo)}</p>
          <a href="#">Find out more on Wikipedia</a>
        </div>
      )}
    </div>
  );
}
