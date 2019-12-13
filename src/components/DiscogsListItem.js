import React from "react";

export default function DiscogsListItem(props) {
  const discogsLink = "https://www.discogs.com/" + props.release.uri;
  return (
    <div className="discogs-list-item">
      <a href={discogsLink} target="_blank" rel="noopener noreferrer">
        <img src={props.release.thumb} alt="thumbnail"></img>
      </a>
      <ul>
        <li>{props.release.catno}</li>
        <li>{props.release.label[0]}</li>
        <li>{props.release.country}</li>
      </ul>
    </div>
  );
}
