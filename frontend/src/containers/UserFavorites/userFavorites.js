import React, { Component } from "react";
import "../SearchResults/searchResults.css";
import Spinner from "../Spinner/spinner";

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFavorites: null,
      loaded: false
    };
    this.removeFavoritesHandler = this.removeFavoritesHandler.bind(this);
  }

  fetchData = () => {
    fetch("/favorites")
      .then(res => res.json())
      .then(result => {
        this.setState(
          {
            userFavorites: result
          },
          this.setState({ loaded: true })
        );
      })
      .catch(error => {
        console.log("Error " + error);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  // remove favorites from the user Favorites list.
  removeFavoritesHandler = e => {
    let index = e.target.id;
    fetch("/home", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        content: index
      })
    })
      .then(res => res.json())
      .then(this.fetchData())
      .catch(error => console.log("Error" + error));
  };

  render() {
    let display = "";
    let spinner = null;

    if (
      this.state.userFavorites === null ||
      this.state.userFavorites[0] === undefined
    ) {
      display = (
        <tr>
          <td>No Favorites Added Yet</td>
        </tr>
      );
    } else if (!this.state.loaded) {
      spinner = <Spinner />;
    } else {
      display = this.state.userFavorites.map((key, i) => {
        if (
          this.state.userFavorites[i].kind === "music-video" ||
          this.state.userFavorites[i].kind === "tv-episode" ||
          this.state.userFavorites[i].kind === "feature-movie"
        ) {
          return (
            <tr key={i}>
              <td>{this.state.userFavorites[i].artist}</td>
              <td>{this.state.userFavorites[i].track}</td>
              <td>{this.state.userFavorites[i].kind}</td>
              <td>
                <video src={this.state.userFavorites[i].preview} controls>
                  AUDIO FILE
                </video>
              </td>
              <td>
                <img src={this.state.userFavorites[i].artwork} alt="Alt" />
              </td>
              <td>{this.state.userFavorites[i].price}</td>
              <td>
                <button
                  className="removeButton"
                  id={this.state.userFavorites[i].id}
                  onClick={this.removeFavoritesHandler}
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={i}>
              <td>{this.state.userFavorites[i].artist}</td>
              <td>{this.state.userFavorites[i].track}</td>
              <td>{this.state.userFavorites[i].kind}</td>
              <td>
                <audio src={this.state.userFavorites[i].preview} controls>
                  AUDIO FILE
                </audio>
              </td>
              <td>
                <img src={this.state.userFavorites[i].artwork} alt="Alt" />
              </td>
              <td>{this.state.userFavorites[i].price}</td>
              <td>
                <button
                  className="removeButton"
                  id={this.state.userFavorites[i].id}
                  onClick={this.removeFavoritesHandler}
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        }
      });
    }

    return (
      <div>
        <h1>Your Favorites</h1>
        {spinner}
        <table className="searchTable">
          <thead>
            <tr>
              <td>Artist Name</td>
              <td>Title</td>
              <td>Type</td>
              <td>Preview</td>
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

export default UserFavorites;
