const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get("/home", (req,res) => {
    res.json({message:"It is Working"})
})


app.post("/home", (req,res) => {
    res.send({message:req.body})
})


app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).send("Something Went Wrong")
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})
