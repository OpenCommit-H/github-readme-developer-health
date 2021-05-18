require("dotenv").config();
const {
    renderError,
    parseBoolean,
    clampValue,
    parseArray,
    CONSTANTS,
} = require("../src/common/utils");
const calendarCard = require("../src/cards/calendar-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");
const { fetchGoogleFitGetData,fetchGoogleFitGetMonthlyData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");

exports.rendercalendarCard = async (req, res) => {
    const {
        username,
        range,
        api_domain,
        wakaname,
        api_key,
        hide,
        hide_title,
        hide_border,
        hide_rank,
        show_icons,
        count_private,
        include_all_commits,
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        cache_seconds,
        custom_title,
        locale,
        disable_animations,
        border_radius,
        border_color,
        month,
        size,
    } = req.query;
   // default data
// if create total fetcher, then fit, commits, sleep will erase
var date = new Date()
var selectedMonth = month? month: date.getMonth()+1;
var selectedsize = size? size: 5;

try {
  console.log(selectedMonth)
  // make data
  res.setHeader("Content-Type", "image/svg+xml");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }
  const userStats = await userinfoStats({ username });
  const { refresh_token } = userStats;
  const access_token = await getAccessToken(refresh_token);
  const temp = await fetchGoogleFitGetData(access_token);
  const month = await fetchGoogleFitGetMonthlyData(access_token,selectedMonth);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  month.selectedMonth = selectedMonth;
  month.username = username;
  month.size = selectedsize;
  console.log(temp)
  console.log(month)
  
  var stats = {
    step: temp.step.reduce(reducer),
    distance: temp.distance.reduce(reducer),
    active_minutes: [
      67, 115, 2,  1, 32, 12, 63, 12, 0,
      13,  78, 2, 63,  0, 11,  1, 18, 0,
       0,   0, 0,  0,  0,  0,  0,  0, 0,
       0,   0, 0,  0
    ],
    heart_level: temp.heart_level.reduce(reducer),
    heart_minutes: temp.heart_minutes.reduce(reducer),
    sleep: temp.sleep.reduce(reducer),
    animal: temp.animal,
    rank: { level: 'A+', score: 50.9662800308734 },
  }
  res.send(calendarCard(month));
} catch (err) {
  return res.send(renderError(err.message, err.secondaryMessage));
}
}
