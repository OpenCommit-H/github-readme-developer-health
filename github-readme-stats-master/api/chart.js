require("dotenv").config();
const {
    renderError,
    parseBoolean,
    clampValue,
    CONSTANTS,
    isLocaleAvailable,
} = require("../src/common/utils");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher");
const fetchStats = require("../src/fetchers/test-fetcher");
const renderChartCard = require("../src/cards/chart-card");
const { fetchGoogleFitGetData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");

module.exports = async (req, res) => {
    const {
        wakaname,
        api_key,
        range,
        api_domain,
        count_private,
        include_all_commits,
        themes,
        username,
    } = req.query;
   // default data
// if create total fetcher, then fit, commits, sleep will erase
var data = [
  {
    "date": "Sun",
    "commits": "0",
  },
  {
    "date": "Mon",
    "commits": "0",
  },
  {
    "date": "Tue",
    "commits": "0",
  },
  {
    "date": "Wed",
    "commits": "0",
  },
  {
    "date": "Thu",
    "commits": "0",
  },
  {
    "date": "Fri",
    "commits": "0",
  },
  {
    "date": "Sat",
    "commits": "0",
  },
];

try {
  const wakaStats = await fetchWakatimeStats({ wakaname, api_domain, range, api_key });
  
  // console.log(wakaStats)
  // find day index
  var dayIdx = 0;
  data.forEach((element, idx) => {
      if (element.date == wakaStats[0].date.split(" ")[0]) {
          dayIdx = idx;
      }
  });
  
  // input last 7 days wakatime api data
  wakaStats.forEach((element) => {
      dayIdx %= 7;
      data[dayIdx++].waka = element.total_seconds / 3600;
  });

  // last 7days github api
  const githubStats = await fetchStats(username);
  console.log(githubStats.day7commits)
  for (i=0; i<githubStats.day7commits.length; i++){
    data[githubStats.day7commits[i].day].commits ++
  }
  // last 7days goofle fit api
  // last 7days goofle fit api
// var refresh_token = "";
const access_token = await getAccessToken(refresh_token);
const test = await fetchGoogleFitGetData(access_token);
// // console.log(test);

test.active_minutes.forEach((element) => {
  dayIdx %= 7;
  data[dayIdx++].fit = element / 60;
})

//수면시간은 잔 다음날 반영되어서 하루 빼고 시작합니다.
//ex)화요일 저녁에 자서 수요일 아침에 깨면 그 시간은 수요일에 반영되어 있음
dayIdx--;
dayIdx = dayIdx == -1 ? 6 : dayIdx;
test.sleep.forEach((element) => {
  dayIdx %= 7;
  data[dayIdx++].sleep = element / 60;
})
  // make data
  console.log(data)
  res.send(renderChartCard(data, wakaname, themes));
} catch (err) {
  return res.send(renderError(err.message, err.secondaryMessage));
}
}