import React, { Component } from "react";
import "../SearchResults/searchResults.css";

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
        this.setState({
          userFavorites: result
        });
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

    if (
      this.state.userFavorites === null ||
      this.state.userFavorites[0] === undefined
    ) {
      display = <div className="testTable">No Favorites Added Yet</div>;
    } else {
      display = this.state.userFavorites.map((key, i) => {
        if (
          this.state.userFavorites[i].kind === "music-video" ||
          this.state.userFavorites[i].kind === "tv-episode" ||
          this.state.userFavorites[i].kind === "feature-movie"
        ) {
          return (
            <div key={i} className="testTable">
              <div className="artist">{this.state.userFavorites[i].artist}</div>
              <div className="track">{this.state.userFavorites[i].track}</div>
              <div className="kind">{this.state.userFavorites[i].kind}</div>
              <div className="preview">
                <video src={this.state.userFavorites[i].preview} controls />
              </div>
              <div className="art">
                <img src={this.state.userFavorites[i].artwork} alt="Alt" />
              </div>
              <div className="price">{this.state.userFavorites[i].price}</div>
              <div className="button">
                <button
                  className="removeButton"
                  id={this.state.userFavorites[i].id}
                  onClick={this.removeFavoritesHandler}
                >
                  X
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div key={i} className="testTable">
              <div className="artist">{this.state.userFavorites[i].artist}</div>
              <div className="track">{this.state.userFavorites[i].track}</div>
              <div className="kind">{this.state.userFavorites[i].kind}</div>
              <div className="preview">
                <audio src={this.state.userFavorites[i].preview} controls />
              </div>
              <div className="art">
                <img src={this.state.userFavorites[i].artwork} alt="Alt" />
              </div>
              <div className="price">{this.state.userFavorites[i].price}</div>
              <div className="button">
                <button
                  className="removeButton"
                  id={this.state.userFavorites[i].id}
                  onClick={this.removeFavoritesHandler}
                >
                  X
                </button>
              </div>
            </div>
          );
        }
      });
    }

    return (
      <div>
        <h1>My Favorites</h1>
        <div className="testTable">
          <div className="artist">Artist</div>
          <div className="track">Title</div>
          <div className="kind">Type</div>
          <div className="preview">Preview</div>
          <div className="art">Image</div>
          <div className="price">Price</div>
          <div className="button">X</div>
        </div>
        {display}
      </div>
    );
  }
}

export default UserFavorites;
