const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

let appStart = true;
let searchCriteria = ""; // values from React user search.
let searchCat = ""; // values from react user search.
let searchError = false;
let userFavorites = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API request, based on Post request received from React front end.

app.get("/home", (req, res) => {
  if (appStart) {
    res.json("No Data Yet");
  } else {
    fetch(
      "https://itunes.apple.com/search?term=" +
        searchCriteria +
        // The limit has been hardcoded to 25 and not been set to be defined by the user as
        // some search results from the API is inconsistent if there are not that many results
        // available. This makes is look as if the results are incorrect. Especially on musicVideo
        // the results returned are normally around half of the actual number submitted.

        "&limit=25" +
        "&media=" +
        searchCat
    )
      .then(response => response.json())
      .then(result => {
        if (searchError) {
          res.json("Incorrect Data Entered Please Try Again");
        } else {
          res.send(result.results);
        }
      })
      .catch(error => {
        console.log("Fetch" + error);
      });
  }
});

app.get("/favorites", (req, res) => {
  res.send(userFavorites);
});

// Post request is received from React front end and the search values are stored in variables
// that is used by the Get request in the API call.

app.post("/home", (req, res) => {
  res.send({ status: "I have received and processed your Request" });
  if (req.body.name === "" || req.body.cat === "") {
    searchError = true;
  } else {
    searchCriteria = req.body.term.replace(" ", "+");
    searchCat = req.body.cat;
    searchError = false;
  }
  appStart = false;
});

// put request to add items to the user favorite listing

app.put("/home", (req, res) => {
  let content = req.body.content;
  userFavorites.push(content);
  res.json("thanks, I have ammended the array for you");
});

app.delete("/home", (req, res) => {
  let index = userFavorites.findIndex(i => i.id == req.body.content);
  userFavorites.splice(index, 1);
  res.json("thanks, I have deleted the items for you");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something Went Wrong");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
