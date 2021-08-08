const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();


//all all sites as per now 
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const PublicGoogleSheetsParser = require('public-google-sheets-parser')

app.use('/',(req,res,next)=>{


    const {spreadsheetId,sheetName}=req.body;

    console.log(spreadsheetId);
    console.log(sheetName);

    const parser = new PublicGoogleSheetsParser(spreadsheetId);


parser.parse(spreadsheetId, sheetName).then((items) => {
    req.items=items;
    next();
  })




})


// simple route
app.get("/", (req, res) => {

    console.log(req.items);

  res.json(req.items);
});





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});