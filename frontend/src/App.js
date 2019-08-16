import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: "",
      artist: "",
      album: "",
      track: "",
      artistImg: "",
      albumImg: "",
      trackImg: "",
      sample: "",
      artwork: "",
      price: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler = e => {
    console.log(this.state.value);
    fetch("/home", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: this.state.value })
    })
      .then(res => res.json())
      .catch(error => console.log("Error" + error));
  };

  changeHandler = e => {
    this.setState({ value: e.target.value });
  };

  componentDidMount() {
    fetch("/home")
      .then(res => res.json())
      .then(result => {
        console.log("Message " + JSON.stringify(result[0][0]));
        this.setState(
          {
            artist: result[0][0].artistName,
            album: result[0][0].collectionName,
            track: result[0][0].trackName,
            artistImg: result[0][0].artistViewUrl,
            albumImg: result[0][0].collectionViewUrl,
            trackImg: result[0][0].trackViewUrl,
            sample: result[0][0].previewUrl,
            artwork: result[0][0].artworkUrl100,
            price: result[0][0].trackPrice
          },
          () => console.log(this.state)
        );
      })
      .catch(error => console.log("Error " + error));
  }

  render() {
    let display = "";
    console.log("RENDER");
    console.log(this.state);

    if (this.state.artwork === "" || this.state.artwork === undefined) {
      display = <h1>No Tracks Have Yet Been Loaded</h1>;
    } else {
      display = (
        <div>
          <ul>
            <li>{this.state.artist}</li>
            <li>{this.state.album}</li>
            <li>{this.state.track}</li>
            <li>
              <audio src={this.state.sample} controls>
                AUDIO FILE
              </audio>
            </li>
            <li>
              <img src={this.state.artwork} />
            </li>
            <li>{this.state.price}</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="App">
        <h1> HELLO WORLD </h1>
        <form id="serach" onSubmit={this.submitHandler}>
          <input
            id="item"
            name="item"
            size="50"
            placeholder="Please Add Your Search Item Here"
            onChange={this.changeHandler}
          />
          <button type="submit">SUBMIT DETAILS</button>
        </form>

        {display}
      </div>
    );
  }
}

export default App;
