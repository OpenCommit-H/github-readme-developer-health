require("dotenv").config();
const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const blacklist = require("../src/common/blacklist");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");
const { fetchGoogleFitGetData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");
const renderFitStatsCard = require("../src/cards/fit-card");

exports.renderFitCard = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    hide_badge,
    show_icons,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    badge_theme,
    cache_seconds,
    custom_title,
    locale,
    disable_animations,
    border_radius,
    border_color,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  try {
    const userStats = await userinfoStats({ username });
    const { refresh_token } = userStats;
    const access_token = await getAccessToken(refresh_token);

    if (access_token == null) {
      return res.send(renderError("Your google api token is wrong","Please re-enorll your account with right token"));
    }

    const temp = await fetchGoogleFitGetData(access_token);
    
    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    var stats = {
      name: username,
      step: temp.step.reduce(reducer),
      distance: temp.distance.reduce(reducer),
      active_minutes: temp.active_minutes.reduce(reducer),
      heart_level: temp.heart_level.reduce(reducer),
      heart_minutes: temp.heart_minutes.reduce(reducer),
      sleep: temp.sleep.reduce(reducer),
      animal: temp.animal,
    }
    
    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(renderFitStatsCard(stats, {
      hide: parseArray(hide),
      show_icons: parseBoolean(show_icons),
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      hide_badge: parseBoolean(hide_badge),
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
      badge_theme,
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
