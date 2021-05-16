const axios = require("axios");

const userinfoStats = async ({ username }) => {
    try {
        const getUserData = await axios.post(`http://localhost:3000/users/getInfo/${username}`);
        const userData = {
            username: getUserData.data.github_id,
            wakaname: getUserData.data.waka_id,
            api_key: getUserData.data.api_key,
            refresh_token: getUserData.data.refresh_token
        }
        
        return userData;
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
    userinfoStats,
};