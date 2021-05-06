const axios = require("axios");
const { google } = require("googleapis");
const request = require("request");
const calculateActivity = require("../calculateActivity");

const fetchGoogleFitGetUrl = async () => {
 
    const oauth2Client = new google.auth.OAuth2(
        // client id
        process.env.CLIENT_ID,
        // client secret
        process.env.CLIENT_SECRET,
        // link to redirect to 
        "http://localhost:3000/api/data"
        
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
        // state: JSON.stringify({
        //     callbackUrl :'',
        //     userId: ''
        // })
    });
    request(url, (err, response, body) => {
        console.log("error : " , err);
        console.log("statusCode: ", response && response.statusCode);
    });

    return url;
};


const fetchGoogleFitGetData = async (code) => {
    const DAY = 7;
    const weekAgo = new Date();
    weekAgo.setHours(0,0,0,0);
    const dayOfMonth = weekAgo.getDate();
    weekAgo.setDate(dayOfMonth - (DAY - 1));

    const END = Date.parse(new Date());
    const START = Date.parse(weekAgo);



    // 일주일 간 헬스 데이터 총합
    const stats = {
        step: 0,
        distance: 0,
        heart_rate_avg: 0,
        heart_rate_max: 0,
        heart_rate_min: 0,
        active_minutes: 0,
        heart_level: 0,
        heart_minutes: 0,
        sleep: 0,
        animal: ""
    };
    
    // const queryURL = new urlParse(url);
    // console.log("---->"+url);
    // const code = queryParse.parse(queryURL.query).code;
    
    const oauth2Client = new google.auth.OAuth2(
        // client id
        process.env.CLIENT_ID,
        // client secret
        process.env.CLIENT_SECRET,
        // link to redirect to 
        "http://localhost:3000/api/data"
    );

    const tokens = await oauth2Client.getToken(code);
    // console.log(tokens);
    

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
                    {
                        dataTypeName: "com.google.heart_minutes",
                        dataSourceId: "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes"
                    },

                ],
                // 86400000 밀리초 = 24시간
                bucketByTime : {durationMillis: 86400000},
                startTimeMillis: START,
                endTimeMillis: END
            }

        });
        fitnessArray = result.data.bucket
        // console.log(fitnessArray)
        for(const dataSet of fitnessArray){
            for(const points of dataSet.dataset){
                for(const p of points.point){
                    if(p.dataTypeName === 'com.google.step_count.delta'){
                        stats.step += p.value[0].intVal
                    }
                    if(p.dataTypeName === 'com.google.distance.delta') {
                        stats.distance += p.value[0].fpVal
                    }
                    if(p.dataTypeName === 'com.google.heart_rate.summary') {
                        stats.heart_rate_avg += p.value[0].fpVal
                        stats.heart_rate_max += p.value[1].fpVal
                        stats.heart_rate_min += p.value[2].fpVal
                    }
                    if(p.dataTypeName === 'com.google.active_minutes') {
                        stats.active_minutes += p.value[0].intVal
                    }
                    if(p.dataTypeName === 'com.google.heart_minutes.summary') {
                        stats.heart_level += p.value[0].fpVal
                        stats.heart_minutes += p.value[1].intVal
                    }
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

        for(const dataSet of sleepArray){
            for(const points of dataSet.dataset){
                for(const p of points.point){
                    if(p.value[0].intVal != 1){
                        for (let i= 0;  i< DAY; i++) {
                            // 86400000 밀리초 = 24시간
                            if(p.startTimeNanos / 1000000 >= START + (86400000 * i)  && p.endTimeNanos / 1000000 <= START + (86400000 * (i + 1))) {
                                stats.sleep += (p.endTimeNanos - p.startTimeNanos) / 1000000000 / 60
                            }
                            
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
     stats.animal = calculateActivity({
        step: stats.step,
        active_minutes: stats.active_minutes,
        heart_minutes: stats.heart_minutes,
        heart_level: stats.heart_level
     });
     
    return stats;
};


module.exports = {
    fetchGoogleFitGetUrl,
    fetchGoogleFitGetData,
};