require("dotenv").config();
const {
    renderError,
    parseBoolean,
    clampValue,
    parseArray,
    CONSTANTS,
} = require("../src/common/utils");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher");
const fetchStats = require("../src/fetchers/test-fetcher");
const renderFitStatsCard = require("../src/cards/fit-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");
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

  var stats = {
    name: 'clalsw',
    totalPRs: 1,
    totalCommits: 16,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 1,
    day7commits: 0,
    rank: { level: 'A+', score: 50.9662800308734 }
  }
  var abc = {
    name:"clalsw",
    step: 1,
    distance: 2,
    heart_rate_avg: 3,
    heart_rate_max: 4,
    heart_rate_min: 5,
    active_minutes: 6,
    heart_level: 7,
    heart_minutes: 8,
    sleep: 9,
    animal: 'aaaaaaaaaaaa',
    rank: { level: 'A+', score: 50.9662800308734 }
  }

  res.send(renderFitStatsCard(abc, {
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
