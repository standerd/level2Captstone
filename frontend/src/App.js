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
      cat: "Please Select",
      data: "",
      resultArr: null,
      artwork: "",
      userFavorites: [],
      loaded: false,
      errorLoading: false
    };

    this.changeTermHandler = this.changeTermHandler.bind(this);
    this.changeCatHandler = this.changeCatHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.addFavoritesHandler = this.addFavoritesHandler.bind(this);
    this.storeFavorites = this.storeFavorites.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  //On submit of search from user function, intitiates the search.
  submitHandler = e => {
    e.preventDefault();
    fetch("/home", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        term: this.state.term,
        cat: this.state.cat
      })
    })
      .then(res => res.json())
      .then(
        this.setState({
          resultArr: null,
          loaded: false,
          errorLoading: false,
          term: "",
          cat: "Please Select"
        })
      )
      .then(this.fetchData())
      .catch(error => console.log("Error" + error));

    //ensures the user is redirected to the search results page if the user searches from the favorites tab.
    this.props.history.push("/");
  };

  // The below 2 handlers handle the input values from the searchbar to be sent to the server
  // for the API call.

  changeTermHandler = e => {
    this.setState({ term: e.target.value });
  };

  changeCatHandler = e => {
    this.setState({ cat: e.target.value });
  };

  // add to favorites button click handler.

  addFavoritesHandler = e => {
    let index = e.target.id;
    e.target.className = "active";
    e.target.disabled = "true";
    let userSelection = {
      artist: this.state.resultArr[index].artistName,
      track: this.state.resultArr[index].trackName,
      kind: this.state.resultArr[index].kind,
      preview: this.state.resultArr[index].previewUrl,
      artwork: this.state.resultArr[index].artworkUrl100,
      price: this.state.resultArr[index].trackPrice,
      id: this.state.resultArr[index].trackId
    };
    this.storeFavorites(userSelection);
  };

  storeFavorites = favorites => {
    fetch("/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: favorites
      })
    })
      .then(res => res.json())
      .catch(error => console.log("Error" + error));
  };

  // fetch search data from the server, this is done on ComponentDidMount
  // as well as on the post request to the server.

  fetchData = () => {
    fetch("/home")
      .then(res => res.json())
      .then(result => {
        this.setState({
          resultArr: result,
          artwork: result[0].artworkUrl100,
          loaded: true
        });
      })
      .catch(error => {
        this.setState({ errorLoading: true });
        console.log("Error " + error);
        console.log(
          this.state.errorLoading,
          this.state.loaded,
          this.state.artwork
        );
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          changeTermHandler={this.changeTermHandler}
          changeCatHandler={this.changeCatHandler}
          submitHandler={this.submitHandler}
          input={this.state.term}
          cat={this.state.cat}
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
              loaded={this.state.loaded}
              loadingError={this.state.errorLoading}
            />
          )}
        />

        <Route exact path="/favorites" render={props => <UserFavorites />} />
      </div>
    );
  }
}

export default withRouter(App);
