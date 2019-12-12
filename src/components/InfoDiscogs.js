import React from "react";
import DiscogsListItem from "./DiscogsListItem";

export default function InfoDiscogs(props) {
  const discogsResult = props.discogsInfo;

  return (
    <div className="info-discogs">
      <img
        className="discogs-logo"
        src="https://a.discogs.com/6c7c7083538b032c3e9ef32acbd53fb23a88d9d0/images/discogs-white.png"
        alt="discogs-logo"
      ></img>
      <p>Browse Discogs Releases</p>
      {discogsResult.map(item => (
        <DiscogsListItem release={item} key={item.id} />
      ))}
      <div class="ui buttons">
        <button class="ui labeled icon button">
          <i class="left chevron icon"></i>
          Previous
        </button>
        <button class="ui right labeled icon button">
          Next
          <i class="right chevron icon"></i>
        </button>
      </div>
    </div>
  );
}
