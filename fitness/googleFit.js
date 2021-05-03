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

const weekAgo = new Date();
weekAgo.setHours(0,0,0,0);
const dayOfMonth = weekAgo.getDate();
weekAgo.setDate(dayOfMonth - 6);

const END = Date.parse(new Date());
const START = Date.parse(weekAgo);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/getURLTing", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        // client id
        process.env.CLIENT_ID,
        // client secret
        process.env.CLIENT_SECRET,
        // link to redirect to 
        "http://localhost:1234/steps"
    );
    
    const scopes=["https://www.googleapis.com/auth/fitness.activity.read profile email openid",
    "https://www.googleapis.com/auth/fitness.location.read", "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.nutrition.read", "https://www.googleapis.com/auth/fitness.blood_pressure.read",
    "https://www.googleapis.com/auth/fitness.blood_glucose.read", "https://www.googleapis.com/auth/fitness.oxygen_saturation.read",
    "https://www.googleapis.com/auth/fitness.body_temperature.read", "https://www.googleapis.com/auth/fitness.reproductive_health.read",
    "https://www.googleapis.com/auth/fitness.sleep.read"];

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
    console.log("================");
    console.log(code);
    const oauth2Client = new google.auth.OAuth2(
        // client id
        process.env.CLIENT_ID,
        // client secret
        process.env.CLIENT_SECRET,
        // link to redirect to 
        "http://localhost:1234/steps"
    );

    const tokens = await oauth2Client.getToken(code);
    // console.log(tokens);
    res.send("HELLO");

    let fitnessArray = [];
    let sleepArray = [];

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
                    {
                        dataTypeName: "com.google.distance.delta",
                        dataSourceId: "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta"
                    },
                    {
                        dataTypeName: "com.google.heart_rate.bpm",
                        dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
                    },
                    {
                        dataTypeName: "com.google.active_minutes",
                        dataSourceId: "derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes"
                    },

                ],
                // 86400000 밀리초 = 24시간
                bucketByTime : {durationMillis: 86400000},
                startTimeMillis: START,
                endTimeMillis: END
            }

        });
        fitnessArray = result.data.bucket
        for(const dataSet of fitnessArray){
            for(const points of dataSet.dataset){
                for(const p of points.point){
                    console.log(p.value)
                }
            }
        }
    } catch (e) {
        console.log(e)
    }


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
                        dataTypeName: "com.google.sleep.segment"
                    }
                ],
                startTimeMillis: START,
                endTimeMillis: END
            },
        });   
        sleepArray = result.data.bucket

        let sleepTime = [0, 0, 0, 0, 0, 0, 0];
        for(const dataSet of sleepArray){
            for(const points of dataSet.dataset){
                for(const p of points.point){
                    if(p.value[0].intVal != 1){
                        for (let i= 0;  i< 7; i++) {
                            // 86400000 밀리초 = 24시간
                            if(p.startTimeNanos / 1000000 >= START + (86400000 * i)  && p.endTimeNanos / 1000000 <= START + (86400000 * (i + 1))) {
                                sleepTime[i] += (p.endTimeNanos - p.startTimeNanos) / 1000000000 / 60
                            }
                            
                        }
                    }
                }
            }
        }
        for(let i = 0; i<7; i++)
            console.log(sleepTime[i])
    } catch (e) {
        console.log(e);
    }

    
})

app.listen(port, () => console.log(`Google Fit it listening on port ${port}`));



