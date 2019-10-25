const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const helmet = require("helmet");

let appStart = true;
let searchCriteria = ""; // values from React user search.
let searchCat = ""; // values from react user search.
let searchError = false;
let userFavorites = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//helmet is used for increased security.
app.use(helmet());

// API request, based on Post request received from React front end.

app.get("/home", (req, res) => {
  if (appStart) {
    res.json({ data: "No Data Yet" });
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
          res.json({ data: "Incorrect Data Entered Please Try Again" });
        } else {
          res.json({ data: result.results });
        }
      })
      .catch(error => {
        console.log("Fetch" + error);
      });
  }
});

app.get("/favorites", (req, res) => {
  res.json({ data: userFavorites });
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

// put request to add items to the user favorite listing, this is stored
// inside an express variable and not a file structure or database. From a
// production point of view I want the users listing to be reset and not
// stored for future users to see.
app.put("/home", (req, res) => {
  let content = req.body.content;
  userFavorites.push(content);
  res.json("thanks, I have ammended the array for you");
});

// straight forward delete handler, on receiving request, the item is removed from the array.
app.delete("/home", (req, res) => {
  let index = userFavorites.findIndex(i => i.id == req.body.content);
  userFavorites.splice(index, 1);
  res.json("thanks, I have deleted the items for you");
});

// for deployment purposes, ensures that heroku knows which default html file to return on start.
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something Went Wrong");
});

//sets the default port to 3001, or env.PORT for Heroku.
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
