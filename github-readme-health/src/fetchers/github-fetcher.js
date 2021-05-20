const { request, logger, CustomError } = require("../common/utils");
const axios = require("axios");
const retryer = require("../common/retryer");
const githubUsernameRegex = require("github-username-regex");

require("dotenv").config();

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          name
          login
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
          repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests(first: 1) {
            totalCount
          }
          issues(first: 1) {
            totalCount
          }
          followers {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
              stargazers {
                totalCount
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
  );
};

const day7CommitsFetcher = async (username) => {
  if (!githubUsernameRegex.test(username)) {
    logger.log("Invalid username");
    return 0;
  }

  // https://developer.github.com/v3/search/#search-commits
  const fetchday7Commits = (variables, token) => {
    function getDateStr(myDate){
      var year = myDate.getFullYear();
      var month = (myDate.getMonth() + 1);
      var day = myDate.getDate();
      
      month = (month < 10) ? "0" + String(month) : month;
      day = (day < 10) ? "0" + String(day) : day;
      
      return  year + '-' + month + '-' + day;
    }
    function lastWeek() {
      var d = new Date();
      var dayOfMonth = d.getDate();
      d.setDate(dayOfMonth - 7);
      return getDateStr(d);
    }
    date = lastWeek();
    console.log(date);
    return axios({
      method: "get",
      // url: `https://api.github.com/search/commits?q=author:${variables.login}`,
      url: `https://api.github.com/search/commits?q=author:${variables.login} author-date:>${date}&sort=author-date&order=asc`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `bearer ${token}`,
      },
    });
  };
  
  try {
    function whatDay(a) {
      var d = new Date(a);
      todayDay = d.getDay();
      return todayDay
    }
    var week = new Array('Sun', 'Mon', 'Tue', 'wen', 'Thu', 'Fri', 'Sat');
    let res = await retryer(fetchday7Commits, { login: username });
    if (res.data.total_count) {
      var commits = [];
      for (i=0; i<res.data.total_count; i++){
        res.data.items[i].commit['day']=whatDay(res.data.items[i].commit.author.date)
        commits.push(res.data.items[i].commit)
      }
      return commits;
    } else {
      return res.data;
    }
  } catch (err) {
    logger.log(err);
    return 0;
  }
};

async function fetchGithubGetWeeklyData(
  username,
) {
  if (!username) throw Error("Invalid username");

  const stats = {
    name: "",
    day7commits: {},
  };

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      "Your username is not exist in github. Please re-enroll your account",
    );
  }
  const user = res.data.data.user;
  stats.name = user.name || user.login;
  stats.day7commits = await day7CommitsFetcher(username);
  return stats;
}

module.exports = fetchGithubGetWeeklyData;