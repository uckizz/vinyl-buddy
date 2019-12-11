import React, { Component } from "react";
import axios from "axios";
import { ReactMic } from "@cleandersonlobo/react-mic";
import TrackInfo from "./TrackInfo";
import CurrentlySpinning from "./CurrentlySpinning";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioBlobURL: "",
      trackInfo: {},
      wikiInfo: "",
      success: false,
      loading: false,
      nullResult: false
    };
  }

  identifyStart = () => {
    this.startRecording();
    this.setState({ nullResult: false });
    setTimeout(this.stopRecording, 4000);
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

  getTrackInfo = async recordedBlob => {
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
  };

  //OFFLINE version not to waste requests

  /*getTrackInfo = recordedBlob => {
    this.setState({
      trackInfo: {
        artist: "Eric Johnson",
        song: "Bristol Shore",
        album: "Live Austin 84",
        cover:
          "https://cdns-images.dzcdn.net/images/cover/d848aaa3b9e7ac6b6930bda28916310f/250x250-000000-80-0-0.jpg"
      },
      loading: false,
      success: true
    });
  };*/

  getWikiInfo = async () => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    let searchString = this.state.trackInfo.artist.replace(" ", "%20");
    console.log(searchString);
    await axios
      .get(
        `${proxy}https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchString}&format=json`
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
