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

  if (
    props.artwork === "" ||
    props.artwork === undefined ||
    props.resultArr === null
  ) {
    display = (
      <tr>
        <td>Please Search Above for Content</td>
      </tr>
    );
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
          <tr key={i}>
            <td>{props.resultArr[i].artistName}</td>
            <td>{props.resultArr[i].trackName}</td>
            <td>{props.resultArr[i].kind}</td>
            <td>
              <video src={props.resultArr[i].previewUrl} controls>
                AUDIO FILE
              </video>
            </td>
            <td>
              <img src={props.resultArr[i].artworkUrl100} alt="Alt" />
            </td>
            <td>{props.resultArr[i].trackPrice}</td>
            <td>
              <button
                value="Add"
                className="inActive"
                id={i}
                onClick={props.addFavorites}
              >
                Add
              </button>
            </td>
          </tr>
        );
      } else {
        // if the preview URL is an audio type the table returns an audio element and not video

        return (
          <tr key={i}>
            <td>{props.resultArr[i].artistName}</td>
            <td>{props.resultArr[i].trackName}</td>
            <td>{props.resultArr[i].kind}</td>
            <td>
              <audio src={props.resultArr[i].previewUrl} controls>
                AUDIO FILE
              </audio>
            </td>
            <td>
              <img src={props.resultArr[i].artworkUrl100} alt="Alt" />
            </td>
            <td>{props.resultArr[i].trackPrice}</td>
            <td>
              <button
                className="inActive"
                value="Add"
                id={i}
                onClick={props.addFavorites}
              >
                Add
              </button>
            </td>
          </tr>
        );
      }
    });
  }
  return (
    <div>
      <h1>Search Results</h1>
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
            <td>Add</td>
          </tr>
        </thead>
        <tbody>{display}</tbody>
      </table>
    </div>
  );
};

export default searchResults;
