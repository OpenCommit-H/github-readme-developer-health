require("dotenv").config();
const { google } = require("googleapis");

const { fetchGoogleFitGetUrl } = require("../src/fetchers/googlefit-fetcher");

 
module.exports = async (req, res) => {

  const {
    
  } = req.query;

//   const oauth2Client = new google.auth.OAuth2(
//     // client id
//     process.env.CLIENT_ID,
//     // client secret
//     process.env.CLIENT_SECRET,
//     // link to redirect to 
//     "http://localhost:3000/api/test"
    
// );

// const scopes=["https://www.googleapis.com/auth/fitness.activity.read profile email openid",
// "https://www.googleapis.com/auth/fitness.location.read"];



// const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: scopes,
//     state: JSON.stringify({
//         callbackUrl :'',
//         userId: ''
//     })
// });


  try{
    const url = await fetchGoogleFitGetUrl();
  res.send(url);

   }catch(err){

     res.send("응안되");
   }


    
 
};


