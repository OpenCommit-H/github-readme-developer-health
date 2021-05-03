require("dotenv").config();
const { fetchGoogleFitGetUrl } = require("../src/fetchers/googlefit-fetcher");

 
module.exports = async (req, res) => {

  const {
    
  } = req.query;

  try{
    const url = await fetchGoogleFitGetUrl();
  res.send(url);

   }catch(err){

     res.send("응안되");
   }


    
 
};


