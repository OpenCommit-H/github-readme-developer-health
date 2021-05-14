require("dotenv").config();
const {
    renderError,
    parseBoolean,
    clampValue,
    CONSTANTS,
    isLocaleAvailable,
} = require("../src/common/utils");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher");
const renderChartCard = require("../src/cards/chart-card");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");
const { getAccessToken, fetchGoogleFitGetData } = require("../src/fetchers/googlefit-fetcher");
module.exports = async (req, res) => {
    const {
        username,
        range,
        api_domain,
        themes
    } = req.query;

    // default data
    // if create total fetcher, then fit, commits, sleep will erase
    var data = [
        {
          "date": "Sun",
          "fit": "2",
          "commits": "1",
          "sleep": "6",
        },
        {
          "date": "Mon",
          "fit": "3",
          "commits": "5",
          "sleep": "7",
        },
        {
          "date": "Tue",
          "fit": "2",
          "commits": "12",
          "sleep": "6",
        },
        {
          "date": "Wed",
          "fit": "0",
          "commits": "9",
          "sleep": "8",
        },
        {
          "date": "Thu",
          "fit": "1",
          "commits": "8",
          "sleep": "8",
        },
        {
          "date": "Fri",
          "fit": "3",
          "commits": "3",
          "sleep": "4",
        },
        {
          "date": "Sat",
          "fit": "2",
          "commits": "0",
          "sleep": "5.5",
        },
    ];

    try {
        const userStats = await userinfoStats({ username });
        const wakaname = userStats.wakaname
        const api_key = userStats.api_key
        const refresh_token = userStats.refresh_token
        
        const wakaStats = await fetchWakatimeStats({ wakaname, api_domain, range, api_key });
        const access_token = await getAccessToken(refresh_token);
        const fitDate = await fetchGoogleFitGetData(access_token);
       
        // find day index
        var dayIdx = 0;
        data.forEach((element, idx) => {
            if (element.date == wakaStats[0].date.split(" ")[0]) {
                dayIdx = idx;
            }
        });
        
        // input last 7 days wakatime api data
        dayIdx = 0;
        wakaStats.forEach((element) => {
            data[dayIdx++].waka = element.total_seconds / 3600;
        });

        // last 7days github api
        // last 7days goofle fit api
        dayIdx = 0;
        fitDate.active_minutes.forEach((element) => {
          data[dayIdx++].fit = element / 60
        })

        dayIdx = 0;
        fitDate.sleep.forEach((element) => {
          data[dayIdx++].sleep = element / 60
        })
        // make data
        const now = new Date();
        const week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
        for(let i=0; i<7; i++){
          var num = now.getDay() - i;
          if(num < 0 ) num = num + 7;
          data[6-i].date = week[num];
        }

        res.send(renderChartCard(data, wakaname, themes));
    } catch (err) {
        return res.send(renderError(err.message, err.secondaryMessage));
    }
}
