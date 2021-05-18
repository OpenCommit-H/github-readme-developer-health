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
  // last 7days goofle fit api
  
  
    try {
      const userStats = await userinfoStats({ username });

      const { wakaname, api_key, refresh_token } = userStats;
      const access_token = await getAccessToken(refresh_token);
      const temp = await fetchGoogleFitGetData(access_token);
      const wakaStats = await fetchWakatimeStats({ wakaname, api_domain, range, api_key });
      // console.log(wakaStats)
      var totaltime = wakaStats.reduce(function(prev, cur) {
        return prev + cur.total_seconds;
      }, 0);
      // console.log(totaltime)
      totaltime = totaltime/3600
      console.log(totaltime)
      function calculateActivity(inputTime) {
    
        const DVELOPTIME_WEEK_BABYBOTTLE = 1;
        const DVELOPTIME_WEEK_TEA = 2;
        const DVELOPTIME_WEEK_COFFEE= 40;
        console.log(inputTime)
        let drink = "";
      
        if(inputTime<DVELOPTIME_WEEK_BABYBOTTLE){
          drink="babyBottle";
        }else if(DVELOPTIME_WEEK_BABYBOTTLE<=inputTime&&inputTime<DVELOPTIME_WEEK_TEA){
          drink="tea";
        
        }else if(DVELOPTIME_WEEK_TEA<=inputTime&&inputTime<DVELOPTIME_WEEK_COFFEE){
          drink="coffee";
        }
        if(DVELOPTIME_WEEK_COFFEE<=inputTime){
          drink="fire";
        }
        return drink;
      }
        // last 7days github api
        const githubStats = await fetchStats(username);
      var selectedDrink = calculateActivity(totaltime);
      console.log(selectedDrink)
      // console.log(test);
      var stats = {
        name: username,
        animal: temp.animal,
        drink: selectedDrink,
        theme: "default",
        size: size,
      };
        res.send(renderAnimalObjectCard(stats));
    } catch (err) {
        return res.send(renderError(err.message, err.secondaryMessage));
    }
}