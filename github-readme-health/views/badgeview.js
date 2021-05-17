require("dotenv").config();
const {
    renderError,
    CONSTANTS,
    clampValue,
} = require("../src/common/utils");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher");
const renderAnimalObjectCard = require("../src/cards/animal-object-card");
const fetchStats = require("../src/fetchers/test-fetcher");
const { fetchGoogleFitGetData, getAccessToken } = require("../src/fetchers/googlefit-fetcher");
const { userinfoStats } = require("../src/fetchers/userinfo-fetcher");

exports.renderBadge = async (req, res) => {
    const {
      range,
      api_domain,
      themes,
      username,
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

  res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    try {
      const userStats = await userinfoStats({ username });

      const { wakaname, api_key, refresh_token } = userStats;

      const wakaStats = await fetchWakatimeStats({ wakaname, api_domain, range, api_key });


        // last 7days github api
        const githubStats = await fetchStats(username);

        // last 7days goofle fit api
      const access_token = await getAccessToken(refresh_token);
      const test = await fetchGoogleFitGetData(access_token);
      // console.log(test);
      var stats = {
        name: "aaaaaaa",
        animal: 4,
        drink: 4,
        theme: "default"
      };
        res.send(renderAnimalObjectCard(stats));
    } catch (err) {
        return res.send(renderError(err.message, err.secondaryMessage));
    }
}