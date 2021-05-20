require("dotenv").config();
const {
    renderError,
    CONSTANTS,
    clampValue,
} = require("../src/common/utils");
const calculateWakatime = require("../src/calculateWakatime");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");
const { fetchGoogleFitGetData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher");
const renderAnimalObjectCard = require("../src/cards/animal-object-card");


exports.renderBadge = async (req, res) => {
  const {
    username,
    api_domain,
    range,
    theme,
    cache_seconds,
    size,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  let cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
    CONSTANTS.TWO_HOURS,
    CONSTANTS.ONE_DAY,
  );

  if (!cache_seconds) {
    cacheSeconds = CONSTANTS.FOUR_HOURS;
  }

  res.setHeader("Cache-Control", "no-store");
  
  try {
    const userStats = await userinfoStats({ username });
    const { wakaname, api_key, refresh_token } = userStats;
    const access_token = await getAccessToken(refresh_token);

    if (access_token == null) {
      return res.send(renderError("Your google api token is wrong","Please re-enorll your account with right token"));
    }

    const googleFitData = await fetchGoogleFitGetData(access_token);
    const wakaStats = await fetchWakatimeStats({ wakaname, api_domain, range, api_key });

    var totaltime = wakaStats.reduce(function(prev, cur) {
      return prev + cur.total_seconds;
    }, 0);
    totaltime = totaltime/3600
    
    var data = {
      name: username,
      animal: googleFitData.animal,
      drink: calculateWakatime(totaltime),
    };
    res.send(renderAnimalObjectCard(data, {size, theme}));
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
}
