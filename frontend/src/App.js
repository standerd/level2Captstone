import React, { Component } from "react";
import SearchBar from "./containers/SearchBar/searchBar";
import SearchResults from "./containers/SearchResults/searchResults";
import UserFavorites from "./containers/UserFavorites/userFavorites";
import { Route, withRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      cat: "",
      data: "",
      resultArr: null,
      artwork: "",
      userFavorites: []
    };

    this.changeTermHandler = this.changeTermHandler.bind(this);
    this.changeCatHandler = this.changeCatHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.addFavoritesHandler = this.addFavoritesHandler.bind(this);
  }

  submitHandler = e => {
    e.preventDefault();
    fetch("/home", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        term: this.state.term,
        cat: this.state.cat,
        qty: this.state.qty
      })
    })
      .then(res => res.json())
      .then(this.fetchData())
      .catch(error => console.log("Error" + error));
      this.props.history.push("/")
      
  };

  

  changeTermHandler = e => {
    this.setState({ term: e.target.value });
  };

  changeCatHandler = e => {
    this.setState({ cat: e.target.value });
  };

  addFavoritesHandler = e => {
    let index = e.target.id;
    console.log("ID is = " + index);
    let userSelection = {
      artist: this.state.resultArr[index].artistName,
      track: this.state.resultArr[index].trackName,
      kind: this.state.resultArr[index].kind,
      preview: this.state.resultArr[index].previewUrl,
      artwork: this.state.resultArr[index].artworkUrl100,
      price: this.state.resultArr[index].trackPrice,
      id: this.state.userFavorites.length
    };
    this.setState(prevStat => ({
      userFavorites: [...prevStat.userFavorites, userSelection]
    }));
    console.log("USERSELECTION " + this.state.userFavorites);
  };

  fetchData = () => {
    fetch("/home")
      .then(res => res.json())
      .then(result => {
        this.setState({
          resultArr: result,
          artwork: result[0].artworkUrl100
        });
      })
      .catch(error => console.log("Error " + error));
  };

  componentDidMount() {
    this.fetchData();
    console.log("State 2 " + this.state.userFavorites);
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          changeTermHandler={this.changeTermHandler}
          changeCatHandler={this.changeCatHandler}
          submitHandler={this.submitHandler}
        />
        <Route
          exact
          path="/"
          render={props => (
            <SearchResults
              {...props}
              artwork={this.state.artwork}
              resultArr={this.state.resultArr}
              addFavorites={this.addFavoritesHandler}
            />
          )}
        />

        <Route
          exact
          path="/favorites"
          render={props => (
            <UserFavorites
              {...props}
              artwork={this.state.artwork}
              resultArr={this.state.userFavorites}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
