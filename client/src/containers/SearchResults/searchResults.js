import React from "react";
import "./searchResults.css";
import Spinner from "../Spinner/spinner";

const searchResults = props => {
  let display = null;
  let spinner = "";

  // below checks if the data has been loaded or not and shows a spinner while the
  // loading takes place.

  if (!props.loaded && !props.loadingError) {
    spinner = <Spinner />;
  } else if (props.loadingError) {
    spinner = <h1>There Was An Error, please check input and search again.</h1>;
  }

  //search result content is set to the below if not search data was submitted
  if (
    props.artwork === "" ||
    props.artwork === undefined ||
    props.resultArr === null
  ) {
    display = <div className="testTable">Please Search Above for Content</div>;
  } else {
    // if the preview URL returns a video preview, the table is adjusted for video
    // instead of audio.
    display = props.resultArr.map((key, i) => {
      if (
        props.resultArr[i].kind === "music-video" ||
        props.resultArr[i].kind === "tv-episode" ||
        props.resultArr[i].kind === "feature-movie"
      ) {
        return (
          <div key={i} className="testTable">
            <div className="artist">{props.resultArr[i].artistName}</div>
            <div className="track">{props.resultArr[i].trackName}</div>
            <div className="kind">{props.resultArr[i].kind}</div>
            <div className="preview">
              <video src={props.resultArr[i].previewUrl} controls />
            </div>
            <div className="art">
              <img src={props.resultArr[i].artworkUrl100} alt="Alt" />
            </div>
            <div className="price">{props.resultArr[i].trackPrice}</div>
            <div className="button">
              <button
                value="Add"
                className="inActive"
                id={i}
                onClick={props.addFavorites}
              >
                +
              </button>
            </div>
          </div>
        );
      } else {
        // if the preview URL is an audio type the table returns an audio element and not video
        return (
          <div key={i} className="testTable">
            <div className="artist">{props.resultArr[i].artistName}</div>
            <div className="track">{props.resultArr[i].trackName}</div>
            <div className="kind">{props.resultArr[i].kind}</div>
            <div className="preview">
              <audio src={props.resultArr[i].previewUrl} controls />
            </div>
            <div className="art">
              <img src={props.resultArr[i].artworkUrl100} alt="Alt" />
            </div>
            <div className="price">{props.resultArr[i].trackPrice}</div>
            <div className="button">
              <button
                className="removeButton inActive"
                value="Add"
                id={i}
                onClick={props.addFavorites}
              >
                +
              </button>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div>
      <h1>Search Results</h1>
      {spinner}
      <div className="testTable">
        <div className="artist">Artist</div>
        <div className="track">Title</div>
        <div className="kind">Type</div>
        <div className="preview">Preview</div>
        <div className="art">Image</div>
        <div className="price">Price</div>
        <div className="button">Add</div>
      </div>
      {display}
    </div>
  );
};

export default searchResults;
