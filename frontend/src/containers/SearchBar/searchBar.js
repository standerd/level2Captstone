import React from "react";
import "./searchBar.css";
import { Link, withRouter } from "react-router-dom";

const searchBar = props => {
  let button = "";

  if (props.location.pathname === "/favorites") {
    button = (
      <button>
        <Link to="/">Back To Search</Link>
      </button>
    );
  } else if (props.location.pathname === "/") {
    button = (
      <button>
        <Link to="/favorites">Go To Favorites</Link>
      </button>
    );
  }

  return (
    <div className="search">
      <h1> Please Search for Items Below </h1>
      <form id="serach" onSubmit={props.submitHandler}>
        <input
          id="item"
          name="item"
          size="50"
          placeholder="Please Add Your Search Item Here"
          onChange={props.changeTermHandler}
        />
        <select onChange={props.changeCatHandler}>
          <option value="all">Select Category</option>
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

export default withRouter(searchBar);
