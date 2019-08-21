const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

let userInfo = [];
let appStart = true;
let searchCriteria = "";
let searchQty = "";
let searchCat = "";
let searchError = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  if (appStart) {
    res.json("No Data Yet");
  } else {
    fetch(
      "https://itunes.apple.com/search?term=" +
        searchCriteria +
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

app.post("/home", (req, res) => {
  console.log(req.body);

  res.send({ status: "I have received and processed your Request" });
  if (req.body.name === "") {
    searchError = true;
  } else {
    searchCriteria = req.body.term.replace(" ", "+");
    searchCat = req.body.cat;
    searchQty = req.body.qty;
    searchError = false;
  }
  appStart = false;
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something Went Wrong");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
