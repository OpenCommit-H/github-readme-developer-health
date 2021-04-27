const express = require("express")
const app = express();
const port = 1234;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");

// 206650107599-go57ohpa7tt3k6bkbeqq40i2cr9cuofj.apps.googleusercontent.com
// kzB43XkVSGixG0OLZF7-Foxv

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/getURLTing", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        // client id
        "31918457324-mjkmqridegrt407ok38m60lcknr6bqbn.apps.googleusercontent.com",
        // client secret
        "yJMavzcAj_9fVUMV30Xh15sj",
        // link to redirect to 
        "http://localhost:1234/steps"
    );
    
    const scopes=["https://www.googleapis.com/auth/fitness.activity.read profile email openid",
    "https://www.googleapis.com/auth/fitness.location.read"];

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackUrl :req.body.callbackUrl,
            userId: req.body.userId
        })
    });

    request(url, (err, response, body) => {
        console.log("error : " , err);
        console.log("statusCode: ", response && response.statusCode);
        res.send({ url });
    });

});

app.get("/steps", async (req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    const oauth2Client = new google.auth.OAuth2(
        // client id
        "31918457324-mjkmqridegrt407ok38m60lcknr6bqbn.apps.googleusercontent.com",
        // client secret
        "yJMavzcAj_9fVUMV30Xh15sj",
        // link to redirect to 
        "http://localhost:1234/steps"
    );

    const tokens = await oauth2Client.getToken(code);
    // console.log(tokens);
    res.send("HELLO");

    let stepArray = [];

    try {
        const result = await axios ({
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type": "application/json",
            url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
            data: {
                aggregateBy : [
                    {
                        dataTypeName: "com.google.step_count.delta",
                        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    },
                    // {
                    //     dataTypeName: "com.google.weight.summary",
                    //     dataSourceId: "derived:com.google.weight:com.google.android.gms:merge_weight"
                    // },
                    {
                        dataTypeName: "com.google.distance.delta",
                        dataSourceId: "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta"
                      }
                ],
                bucketByTime : {durationMillis: 86400000},
                startTimeMillis: 1619449200000,
                endTimeMillis: 1619500443000,
            },

        });
        console.log(result)       
        // console.log(result.data.bucket)       
        stepArray = result.data.bucket
    } catch (e) {
        console.log(e);
    }

    try {
        for(const dataSet of stepArray){
            // console.log(dataSet);
            for(const points of dataSet.dataset){
                // console.log(points)
                for(const p of points.point){
                    console.log(p.value)
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => console.log(`Google Fit it listening on port ${port}`));



