import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: "",
      resultArr: null,
      artwork: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler = e => {
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
        this.setState({
          resultArr: result,
          artwork: result[0].artworkUrl100
        });
      })
      .catch(error => console.log("Error " + error));
  }

  render() {
    let display = "";

    if (this.state.artwork === "" || this.state.artwork === undefined) {
      display = (
        <tr>
          <td>No Tracks Loaded Yet</td>
        </tr>
      );
    } else {
      display = this.state.resultArr.map((key, i) => {
        return (
          <tr key={i}>
            <td>{this.state.resultArr[i].artistName}</td>
            <td>{this.state.resultArr[i].collectionName}</td>
            <td>{this.state.resultArr[i].trackName}</td>
            <td>
              <audio src={this.state.resultArr[i].previewUrl} controls>
                AUDIO FILE
              </audio>
            </td>
            <td>
              <img src={this.state.resultArr[i].artworkUrl100} alt="Alt" />
            </td>
            <td>{this.state.resultArr[i].trackPrice}</td>
            <td>
              <button>Remove</button>
            </td>
          </tr>
        );
      });
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
        <table>
          <thead>
            <tr>
              <td>Artist Name</td>
              <td>Album Name</td>
              <td>Song Title</td>
              <td>Song Preview</td>
              <td>Album Image</td>
              <td>Song Price</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>{display}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
