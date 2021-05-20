require("dotenv").config();
const {
  parseBoolean,
  renderError,
} = require("../src/common/utils");
const calendarCard = require("../src/cards/calendar-card");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");
const { fetchGoogleFitGetMonthlyData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");

exports.rendercalendarCard = async (req, res) => {
  const {
    username,
    month,
    size,
    theme,
    outline,
    hide,
    animation,
    cache_seconds,
  } = req.query;

  var date = new Date();
  var selectedMonth = month? month: date.getMonth()+1;

  try {

    res.setHeader("Content-Type", "image/svg+xml");

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );
  
    if (!cache_seconds) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }
  
    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    const userStats = await userinfoStats({ username });

    const { refresh_token } = userStats;

    const access_token = await getAccessToken(refresh_token);

    const data = await fetchGoogleFitGetMonthlyData(access_token,selectedMonth);
    data.selectedMonth = selectedMonth;
    data.username = username;

    res.send(calendarCard(data,{ size, theme, outline: parseBoolean(outline), hide: parseBoolean(hide), animation: parseBoolean(animation) }));
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
}
