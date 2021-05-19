require("dotenv").config();
const {
    renderError,
    parseBoolean,
    clampValue,
    parseArray,
    CONSTANTS,
} = require("../src/common/utils");
const renderFitStatsCard = require("../src/cards/fit-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");
const { fetchGoogleFitGetData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");

exports.renderFitCard = async (req, res) => {
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
    } = req.query;
   // default data
// if create total fetcher, then fit, commits, sleep will erase

try {
  
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
  if (access_token == null) {
    return res.send(renderError("Your google api token is wrong","Please re-enorll your account with right token"));
  }
  const temp = await fetchGoogleFitGetData(access_token);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
  console.log(temp)
  
  var stats = {
    name: username,
    step: temp.step.reduce(reducer),
    distance: temp.distance.reduce(reducer),
    active_minutes: temp.active_minutes.reduce(reducer),
    heart_level: temp.heart_level.reduce(reducer),
    heart_minutes: temp.heart_minutes.reduce(reducer),
    sleep: temp.sleep.reduce(reducer),
    animal: temp.animal,
    rank: { level: 'A+', score: 50.9662800308734 },
  }
  console.log(stats)
  res.send(renderFitStatsCard(stats, {
    hide: parseArray(hide),
    show_icons: parseBoolean(show_icons),
    hide_title: parseBoolean(hide_title),
    hide_border: parseBoolean(hide_border),
    hide_rank: parseBoolean(hide_rank),
    include_all_commits: parseBoolean(include_all_commits),
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    custom_title,
    border_radius,
    border_color,
    locale: locale ? locale.toLowerCase() : null,
    disable_animations: parseBoolean(disable_animations),
  }));
} catch (err) {
  return res.send(renderError(err.message, err.secondaryMessage));
}
}
