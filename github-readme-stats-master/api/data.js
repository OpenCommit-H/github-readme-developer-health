require("dotenv").config();
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");

const { fetchGoogleFitGetUrl } = require("../src/fetchers/googlefit-fetcher");
const { fetchGoogleFitGetData } = require("../src/fetchers/googlefit-fetcher");



 
module.exports = async (req, res) => {

  const {
    
  } = req.query;

  // try{
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const test = await fetchGoogleFitGetData(code);
  res.send(test);


  //  }catch(err){

  //    res.send("응안되");
  //  }

};