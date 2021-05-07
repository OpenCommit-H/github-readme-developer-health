require("dotenv").config();
const { fetchGoogleFitGetUrl } = require("../src/fetchers/googlefit-fetcher");
const { fetchGoogleFitGetData } = require("../src/fetchers/googlefit-fetcher");



 
module.exports = async (req, res) => {

  const {
    username,
    wakaname,
    api_key
  } = req.query;

   try{
     
      const url = await fetchGoogleFitGetUrl({username, wakaname, api_key});
      //const test = await fetchGoogleFitGetData({url});
      res.send(url);


   }catch(err){
    console.log(err);
   }

};


