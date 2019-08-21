import React from "react";
import "./searchResults.css";

const searchResults = props => {
  let display = "";

  if (props.artwork === "" || props.artwork === undefined) {
    display = (
      <tr>
        <td>No Tracks Loaded Yet</td>
      </tr>
    );
  } else {
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
              <button id={i} onClick={props.addFavorites}>
                Add
              </button>
            </td>
          </tr>
        );
      } else {
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
              <button id={i} onClick={props.addFavorites}>
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
