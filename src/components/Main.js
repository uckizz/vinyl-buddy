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
      success: false,
      loading: false
    };
  }

  identifyStart = () => {
    this.startRecording();
    setTimeout(this.stopRecording, 8000);
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

  getTrackInfo = recordedBlob => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    var bodyFormData = new FormData();
    bodyFormData.append("file", recordedBlob.blob);
    bodyFormData.set("api_token", "c7b206bbca0ca75fa60872fd51256a14");
    bodyFormData.set("return", "timecode,apple_music,deezer,spotify");
    axios
      .post(`${proxy}https://api.audd.io/`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
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

        {this.state.loading === true ? (
          <div>
            <div className="ui active centered inline loader loading-spinner"></div>
            <p>Identifying song</p>
          </div>
        ) : null}
        {this.state.success === true ? (
          <TrackInfo trackInfo={this.state.trackInfo} />
        ) : null}
        {this.state.loading === false ? (
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
