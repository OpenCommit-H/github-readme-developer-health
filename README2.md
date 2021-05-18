<p algin="center">
    <img width="100px" src="./README/gym.png" aling="center" alt="Github Readme Health" />
    <h2 align="center">Github Readme Health</h2>
	<p align="center">Let's do one-day one-exercise!</p>
</p>





# Features

- [Introduction](#introduction)
- [Gather Your Data](#gather-your-data)
- [Register Your Data](#register-your-data)
- [Chart Card](#chart-card)
- [Tech](#tech)
- [Contributer](#contributer)



# Introduction

Today, developers work in the same position for a long time.

And we can't exercise steadily.

This causes problems such as gaining weight or poor posture.

So, **Our service is aimed at a one-day one-exercise campaign for developers.**



# Gather Your Data

we compare development time and exercise time, then provide a cute card-view at your readme.

First of all, you need to collect data on exercise time and development time.

Our servive use wakatime for gathering development time, and google fitness application for gathering exercise time.

- [Install wakatime plugin at your IDEs](https://wakatime.com/plugins)
- [Install google fitness application on your cell phone](https://play.google.com/store/apps/details?id=com.google.android.apps.fitness&hl=ko&gl=US)

_As a note, If you use wakatime, then have to register username and set public your develop Info._

# Register Your Infos

Register your data for using our service.

We need your github username, wakatime username, wakatime api_key and google api token.

1. Access our register page.

```
https://k4a302.p.ssafy.io/api
```

2. Write your usernames and api_key.

3. Get a google api token by using button.

4. Register your Infos.



# Chart Card

Copy-paste this into your readme or other markdown editor.

Change the `?username=` value to your Github username.

```
![Openmind's Github Readme Health](https://k4a302.p.ssafy.io/cards/chart?username=pyoki32)
```

## Themes

You can use variouse themes that we provide.

#### All thems:

default, forest, blue

<img src="./README/defaultChart.PNG" alt="Github Readme Health Themes" width="200px"/><img src="./README/forestChart.PNG" alt="Github Readme Health Themes" width="200px"/><img src="./README/blueChart.PNG" alt="Github Readme Health Themes" width="200px"/>



## Customization

You can customize the appearence of your Chart card-view with URL params.

#### Common Options:

- size - Card-view's size in your readme.







# Tech

| Platform                               | Languages           | Environment             |
| -------------------------------------- | ------------------- | ----------------------- |
| Gitlab, Jira, Notion, Node js, MongoDB | JavaScript,CSS,HTML | VS Code, AWS EC2, NginX |

architecture image



# Contributer

| Name   | Github | Role |
| ------ | ------ | ---- |
| 김정웅 |        |      |
| 신다정 |        |      |
| 이석원 |        |      |
| 조성훈 |        |      |
| 표기동 |        |      |





__start project__

> Open Source

# health
깃 개발자 건강지표 카드뷰<p>
🌴🌴🌴🌴🌴🌴🌴🌴🌴
<p>🌴🌴🌴팀장 김정웅🌴🌴🌴  
</p>
🌴🌴🌴🌴🌴🌴🌴🌴🌴
<p><p></p></p>
<p>팀원 표기동 </p>
<p>팀원 신다정 </p>    
<p>팀원 조성훈 </p>
<p>팀원 이석원 </p>


# google fit API
https://developers.google.com/oauthplayground/

# how to run status
To run & test github-readme-stats you need to follow few simple steps :-
(make sure you already have a vercel account)

Install Vercel CLI
Fork the repository and clone the code to your local machine
Run the command "vercel" in the root and follow the steps there
Create a .env file in the root of the directory
In the .env file add a new variable named "PAT_1" with your github Personal access token
Run the command "vercel dev" to start a development server at https://localhost:3000

console.log(JSON.stringify("보고싶은 json 형식 데이터", null, '\t'))
ex) console.log(JSON.stringify(res.data, null, '\t'))



# Google fit Api -  node.js

/fitness

모듈 다운로드

$ npm i express googleapis request cors url-parse query-string body-parser axios

서버실행

$ node googleFit.js


url 요청 get postman

http://localhost:1234/getURLTing



 커밋???