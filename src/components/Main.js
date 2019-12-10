import React, { Component } from "react";
import axios from "axios";
import { ReactMic } from "@cleandersonlobo/react-mic";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioBlobURL: "",
      artist: "",
      song: "",
      album: ""
    };
  }

  identifyStart = () => {
    this.startRecording();
    setTimeout(this.stopRecording, 4000);
  };

  startRecording = () => {
    this.setState({
      record: true,
      loading: true
    });
  };

  stopRecording = () => {
    this.setState({
      record: false,
      loading: false
    });
  };

  playRecording = () => {
    let audio = new Audio(this.state.audioBlobURL);
    audio.play();
  };

  onStop = recordedBlob => {
    this.setState({ audioBlobURL: recordedBlob.blobURL });

    const proxy = "https://cors-anywhere.herokuapp.com/";

    var bodyFormData = new FormData();
    bodyFormData.append("file", recordedBlob.blob);
    bodyFormData.set("api_token", "c7b206bbca0ca75fa60872fd51256a14");

    axios
      .post(`${proxy}https://api.audd.io/`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          artist: response.data.result.artist,
          song: response.data.result.title,
          album: response.data.result.album
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <ReactMic
          className="audio-recorder"
          record={this.state.record}
          onStop={this.onStop}
          onData={this.onData}
          mimeType="audio/mp3"
        />
        <button onClick={this.identifyStart} type="button">
          Start
        </button>
        <button onClick={this.playRecording} type="button">
          Play
        </button>
        <h3>Artist: {this.state.artist}</h3>
        <h3>Song: {this.state.song}</h3>
        <h3>Album: {this.state.album}</h3>
      </div>
    );
  }
}
