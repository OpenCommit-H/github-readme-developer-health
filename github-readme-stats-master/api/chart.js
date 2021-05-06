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

module.exports = async (req, res) => {
    const {
        username,
        api_key,
        range,
        api_domain,
        count_private,
        include_all_commits,
        themes,
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
        const wakaStats = await fetchWakatimeStats({ username, api_domain, range, api_key });
        
        // find day index
        var dayIdx = 0;
        data.forEach((element, idx) => {
            if (element.date == wakaStats[0].date.split(" ")[0]) {
                dayIdx = idx;
                console.log(element.date);
            }
        });
        
        // input last 7 days wakatime api data
        wakaStats.forEach((element) => {
            dayIdx %= 7;
            data[dayIdx++].waka = element.total_seconds / 3600;
        });

        // last 7days github api
        // last 7days goofle fit api
        // make data

        res.send(renderChartCard(data, username, themes));
    } catch (err) {
        return res.send(renderError(err.message, err.secondaryMessage));
    }
}