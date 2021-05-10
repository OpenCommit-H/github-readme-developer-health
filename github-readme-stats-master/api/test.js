require("dotenv").config();
const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchStats = require("../src/fetchers/test-fetcher");
const renderStatsCard = require("../src/cards/test-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher");
const { fetchGoogleFitGetData, getRefreshToken } = require("../src/fetchers/googlefit-fetcher");
const { getAccessToken } = require("../src/fetchers/googlefit-fetcher");
module.exports = async (req, res) => {
  const {
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
    api_domain,
    range,
    code,
    state
    // hide_progress,
    // layout,
    // langs_count
  } = req.query;
  // const user = JSON.parse(state);
  let stats;
  res.setHeader("Content-Type", "image/svg+xml");
  const refresh_token = await getRefreshToken(code)
  console.log(refresh_token)
  const access_token = await getAccessToken('1//0eLJPFnKPoGI5CgYIARAAGA4SNwF-L9IraV1-OmrK_PWAWPTr_mUqXW0qPcZ6axKGUuGwuJRBbV77gjKYTwVEQBdpgYkDmGZrc0g');
  console.log(access_token)
  const test = await fetchGoogleFitGetData(access_token);
  console.log(test)
  if (blacklist.includes(JSON.parse(state).username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  try {
    stats = await fetchStats(
      JSON.parse(state).username,
      parseBoolean(count_private),
      parseBoolean(include_all_commits),
    );
    const wakaname = JSON.parse(state).wakaname;
    console.log(wakaname)
    const api_key = JSON.parse(state).api_key;
    const wakastats = await fetchWakatimeStats({ wakaname, api_domain, range, api_key });
    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
    
    console.log(wakastats);
    console.log("===========");
    console.log(stats);

    return res.send(
      renderStatsCard(stats, {
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
        animal: 2,
        drink: 1,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
