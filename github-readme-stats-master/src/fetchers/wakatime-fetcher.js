const axios = require("axios");

const fetchWakatimeStats = async ({ username, api_domain, range, api_key }) => {
  try {
    const dailyData = await axios.get(
      `https://${
        api_domain ? api_domain.replace(/[^a-z-.0-9]/gi, "") : "wakatime.com"
      }/api/v1/users/${username}/summaries?range=last_7_days&api_key=${api_key}`,
    );

    var dataList = new Array();

    dailyData.data.data.forEach(function (data, idx) {
      data.grand_total.date = data.range.text;
      dataList.push(data.grand_total);
    });

    return dataList;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
      throw new Error(
        "Wakatime user not found, make sure you have a wakatime profile",
      );
    }
    throw err;
  }
};

module.exports = {
  fetchWakatimeStats,
};
