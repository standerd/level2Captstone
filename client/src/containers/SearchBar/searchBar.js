import React from "react";
import "./searchBar.css";
import { Link, withRouter } from "react-router-dom";

const searchBar = props => {
  let button = "";

  // Check the location of the app, and render the button to go to
  // search or userfavorites accordingly

  if (props.location.pathname === "/favorites") {
    button = <Link to="/">Back To Search -></Link>;
  } else if (props.location.pathname === "/") {
    button = <Link to="/favorites">Go To Favorites-></Link>;
  }

  // Props for the component only consist of the changeHandlers that deal
  // with the colleciton of the user data for the search

  return (
    <div className="search">
      <h1> Please Search for Items Below </h1>
      <form id="serach" onSubmit={props.submitHandler}>
        <input
          value={props.input}
          id="item"
          name="item"
          size="50"
          placeholder="Please Add Your Search Item Here"
          onChange={props.changeTermHandler}
        />
        <select value={props.cat} onChange={props.changeCatHandler}>
          <option value="all">Content Type</option>
          <option value="all">All</option>
          <option value="music">Music</option>
          <option value="musicVideo">Music Video</option>
          <option value="movie">Movie</option>
          <option value="podcast">Podcast</option>
          <option value="shortFilm">Short Film</option>
          <option value="audiobook">Audio Book</option>
          <option value="tvShow">TV Show</option>
          <option value="ebook">E-Book</option>
          <option value="software">Software</option>
        </select>
        <button type="submit">Submit</button>
        {button}
      </form>
    </div>
  );
};

//withRouter required for enabling access to the locations
export default withRouter(searchBar);
