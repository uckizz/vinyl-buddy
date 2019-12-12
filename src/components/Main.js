import React, { Component } from "react";
import axios from "axios";
import { ReactMic } from "@cleandersonlobo/react-mic";
import TrackInfo from "./TrackInfo";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioBlobURL: "",
      trackInfo: {},
      wikiInfo: "",
      discogsInfo: [],
      success: false,
      loading: false,
      nullResult: false
    };
  }

  identifyStart = () => {
    this.startRecording();
    this.setState({ nullResult: false });
    setTimeout(this.stopRecording, 2000);
  };

  startRecording = () => {
    this.setState({
      record: true,
      loading: true,
      success: false
    });
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
  };

  playRecording = () => {
    let audio = new Audio(this.state.audioBlobURL);
    audio.play();
  };

  /*getTrackInfo = async recordedBlob => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    var bodyFormData = new FormData();
    bodyFormData.append("file", recordedBlob.blob);
    bodyFormData.set("api_token", "c7b206bbca0ca75fa60872fd51256a14");
    bodyFormData.set("return", "timecode,apple_music,deezer,spotify");
    await axios
      .post(`${proxy}https://api.audd.io/`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.result === null) {
          this.setState({ nullResult: true });
          this.setState({ loading: false });
        }
        this.setState({
          success: true,
          loading: false,
          trackInfo: {
            artist: response.data.result.artist,
            song: response.data.result.title,
            album: response.data.result.album,
            cover: response.data.result.deezer.album.cover_medium
          }
        });
        this.getWikiInfo();
      })
      .catch(function(error) {
        console.log(error);
      });
  };*/

  //OFFLINE version not to waste requests

  getTrackInfo = () => {
    this.setState({
      trackInfo: {
        artist: "Elliott Smith",
        song: "Alameda",
        album: "Either/Or",
        cover:
          "https://upload.wikimedia.org/wikipedia/en/f/fd/Elliottsmitheitheror55.jpg"
      },
      loading: false,
      success: true
    });
    this.getWikiInfo();
    this.getDiscogsInfo();
  };

  getWikiInfo = async () => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    let artist = this.state.trackInfo.artist.replace(" ", "%20");
    let album = this.state.trackInfo.album.replace(" ", "%20");
    await axios
      .get(
        `${proxy}https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${artist +
          "%20" +
          album}&format=json`
      )
      .then(response => {
        console.log("wikinresp");
        console.log(response);
        this.setState({ wikiInfo: response.data.query.search[0].snippet });
      })
      .catch(error => {
        //console.log(error);
      });
  };

  getDiscogsInfo = async () => {
    let artist = this.state.trackInfo.artist;
    let album = this.state.trackInfo.album;
    const DISCOGS_API_SECRET = "ouSzglIWzBxYEthxupquwnRWFaQsGlYP";
    const DISCOGS_API_KEY = "UyWkRaLLrlgBTSFnXIKY";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    await axios
      .get(
        `${proxy}https://api.discogs.com/database/search?artist=${artist}&release_title=${album}&secret=${DISCOGS_API_SECRET}&key=${DISCOGS_API_KEY}&per_page=5&page=1`,
        {
          headers: { "x-requested-with": true, XMLHttpRequest: true }
        }
      )
      .then(response => {
        this.setState({
          discogsInfo: response.data.results
        });
      })
      .catch(error => {
        console.log("discogs fel");
        console.log(error);
      });
  };

  refresh = () => {
    this.identifyStart();
  };

  onStop = recordedBlob => {
    this.setState({ audioBlobURL: recordedBlob.blobURL });
    this.getTrackInfo(recordedBlob);
  };

  render() {
    return (
      <div className="main-container">
        <ReactMic
          className="audio-recorder"
          record={this.state.record}
          onStop={this.onStop}
          onData={this.onData}
          mimeType="audio/mp3"
        />
        {this.state.nullResult === true ? (
          <div>
            <p>Couldn't fetch results. Try again..</p>
            <button
              className="ui inverted basic button identify-button"
              onClick={this.identifyStart}
            >
              Start
            </button>
          </div>
        ) : null}
        {this.state.loading === true ? (
          <div>
            <div className="ui active centered inline loader big loading-spinner"></div>
            <h2>Identifying song..</h2>
          </div>
        ) : null}
        {this.state.success === true ? (
          <TrackInfo
            trackInfo={this.state.trackInfo}
            wikiInfo={this.state.wikiInfo}
            discogsInfo={this.state.discogsInfo}
            refresh={this.refresh}
          />
        ) : null}
        {this.state.loading === false &&
        this.state.success === false &&
        this.state.nullResult === false ? (
          <button
            className="ui inverted basic button identify-button"
            onClick={this.identifyStart}
          >
            Start
          </button>
        ) : null}
      </div>
    );
  }
}
