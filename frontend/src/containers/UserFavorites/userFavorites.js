import React from "react";
import "../SearchResults/searchResults.css";

const userFavorites = props => {
  console.log("From Props" + props.resultArr);
  let display = "";

  if (props.artwork === "" || props.artwork === undefined) {
    display = (
      <tr>
        <td>No Favorites Added Yet</td>
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
            <td>{props.resultArr[i].artist}</td>
            <td>{props.resultArr[i].track}</td>
            <td>{props.resultArr[i].kind}</td>
            <td>
              <video src={props.resultArr[i].preview} controls>
                AUDIO FILE
              </video>
            </td>
            <td>
              <img src={props.resultArr[i].artwork} alt="Alt" />
            </td>
            <td>{props.resultArr[i].price}</td>
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
            <td>{props.resultArr[i].artist}</td>
            <td>{props.resultArr[i].track}</td>
            <td>{props.resultArr[i].kind}</td>
            <td>
              <audio src={props.resultArr[i].preview} controls>
                AUDIO FILE
              </audio>
            </td>
            <td>
              <img src={props.resultArr[i].artwork} alt="Alt" />
            </td>
            <td>{props.resultArr[i].price}</td>
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
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>{display}</tbody>
      </table>
    </div>
  );
};

export default userFavorites;
