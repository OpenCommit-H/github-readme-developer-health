require("dotenv").config();

module.exports = async (req, res) => {
    const {
      
    } = req.query;

    var data = [
        {
          "date": "Sun",
          "waka": "2",
          "fit": "2",
          "commits": "1",
          "sleep": "6",
        },
        {
          "date": "Mon",
          "waka": "5",
          "fit": "3",
          "commits": "5",
          "sleep": "7",
        },
        {
          "date": "Tue",
          "waka": "6",
          "fit": "2",
          "commits": "12",
          "sleep": "6",
        },
        {
          "date": "Wed",
          "waka": "5",
          "fit": "0",
          "commits": "9",
          "sleep": "8",
        },
        {
          "date": "Thu",
          "waka": "4",
          "fit": "1",
          "commits": "8",
          "sleep": "8",
        },
        {
          "date": "Fri",
          "waka": "3",
          "fit": "3",
          "commits": "3",
          "sleep": "4",
        },
        {
          "date": "Sat",
          "waka": "0",
          "fit": "2",
          "commits": "0",
          "sleep": "5.5",
        },
    ];
    
    console.log(data);


    var svgSizeWidth = 500;
    var svgSizeHeight = 500;

    
    var chartStartX = 15;
    var chartStartY = 40;
    var chartEndX = 70;
    var chartEndY = 40;
    
    var standardTime = 24;
    
    var username = "ssafy";
    
    var dx = new Array();
    dx.push(0);
    dx.push(10);
    dx.push(20);
    dx.push(30);
    dx.push(40);
    dx.push(50);
    dx.push(60);
    
    var maxCommit = 0;
    data.forEach((element) => {
        maxCommit = Math.max(maxCommit, parseInt(element.commits));
    })
    maxCommit += 1;
    console.log(maxCommit);
    
    var svg = `
      <svg version="1.1" width="${svgSizeWidth}" height="${svgSizeHeight}" xmlns="http://www.w3.org/2000/svg>
        <svg width="100%" height="100%">
        <style>
          circle {
            fill: #020715;
            stroke: maroon;
            stroke-width: 0.4px;
          }
          .bar {
            stroke: gray;
            stroke-width: 0.3px;
          }
          #title {
            text-anchor: middle;
            fill: #ffaaaa;
            font: bold 28px sans-selif;
          }
          #infoText {
            fill: #ffaaaa;
          }
          #day {
            text-anchor: middle;
          }
          polyline {
            fill:none;
            stroke:#a79c8e;
            stroke-width:4;
          }
          #chart {
            stroke:gray;
            stroke-width:0.4px;
          }
          #sleep {
            fill: #eb9f9f;
          }
          #waka {
            fill: #f1bbba;
          }
          #fit {
            fill: #f8ecc9;
          }
        </style>
          <circle cx="50%" cy="50%" r="48%"/>
          <rect id="chart" fill="none" x="${chartStartX}%" y="${chartStartY}%" width="${chartEndX}%" height="${chartEndY}%"/>
    
          <g id="sleep">
            <rect class="bar" x="${chartStartX + dx[0]}%" y="${chartStartY + chartEndY - (data[0].sleep / standardTime) * 40}%" width="10%" height="${(data[0].sleep / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[1]}%" y="${chartStartY + chartEndY - (data[1].sleep / standardTime) * 40}%" width="10%" height="${(data[1].sleep / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[2]}%" y="${chartStartY + chartEndY - (data[2].sleep / standardTime) * 40}%" width="10%" height="${(data[2].sleep / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[3]}%" y="${chartStartY + chartEndY - (data[3].sleep / standardTime) * 40}%" width="10%" height="${(data[3].sleep / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[4]}%" y="${chartStartY + chartEndY - (data[4].sleep / standardTime) * 40}%" width="10%" height="${(data[4].sleep / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[5]}%" y="${chartStartY + chartEndY - (data[5].sleep / standardTime) * 40}%" width="10%" height="${(data[5].sleep / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[6]}%" y="${chartStartY + chartEndY - (data[6].sleep / standardTime) * 40}%" width="10%" height="${(data[6].sleep / standardTime) * 40}%"/>
          </g>
          <g id="waka">
            <rect class="bar" x="${chartStartX + dx[0]}%" y="${chartStartY + chartEndY - (data[0].sleep / standardTime) * 40 - (data[0].waka / standardTime) * 40}%" width="10%" height="${(data[0].waka / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[1]}%" y="${chartStartY + chartEndY - (data[1].sleep / standardTime) * 40 - (data[1].waka / standardTime) * 40}%" width="10%" height="${(data[1].waka / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[2]}%" y="${chartStartY + chartEndY - (data[2].sleep / standardTime) * 40 - (data[2].waka / standardTime) * 40}%" width="10%" height="${(data[2].waka / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[3]}%" y="${chartStartY + chartEndY - (data[3].sleep / standardTime) * 40 - (data[3].waka / standardTime) * 40}%" width="10%" height="${(data[3].waka / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[4]}%" y="${chartStartY + chartEndY - (data[4].sleep / standardTime) * 40 - (data[4].waka / standardTime) * 40}%" width="10%" height="${(data[4].waka / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[5]}%" y="${chartStartY + chartEndY - (data[5].sleep / standardTime) * 40 - (data[5].waka / standardTime) * 40}%" width="10%" height="${(data[5].waka / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[6]}%" y="${chartStartY + chartEndY - (data[6].sleep / standardTime) * 40 - (data[6].waka / standardTime) * 40}%" width="10%" height="${(data[6].waka / standardTime) * 40}%"/>
          </g>
    
          <g id="fit">
            <rect class="bar" x="${chartStartX + dx[0]}%" y="${chartStartY + chartEndY - (data[0].sleep / standardTime) * 40 - (data[0].waka / standardTime) * 40 - (data[0].fit / standardTime) * 40}%" width="10%" height="${(data[0].fit / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[1]}%" y="${chartStartY + chartEndY - (data[1].sleep / standardTime) * 40 - (data[1].waka / standardTime) * 40 - (data[1].fit / standardTime) * 40}%" width="10%" height="${(data[1].fit / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[2]}%" y="${chartStartY + chartEndY - (data[2].sleep / standardTime) * 40 - (data[2].waka / standardTime) * 40 - (data[2].fit / standardTime) * 40}%" width="10%" height="${(data[2].fit / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[3]}%" y="${chartStartY + chartEndY - (data[3].sleep / standardTime) * 40 - (data[3].waka / standardTime) * 40 - (data[3].fit / standardTime) * 40}%" width="10%" height="${(data[3].fit / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[4]}%" y="${chartStartY + chartEndY - (data[4].sleep / standardTime) * 40 - (data[4].waka / standardTime) * 40 - (data[4].fit / standardTime) * 40}%" width="10%" height="${(data[4].fit / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[5]}%" y="${chartStartY + chartEndY - (data[5].sleep / standardTime) * 40 - (data[5].waka / standardTime) * 40 - (data[5].fit / standardTime) * 40}%" width="10%" height="${(data[5].fit / standardTime) * 40}%"/>
            <rect class="bar" x="${chartStartX + dx[6]}%" y="${chartStartY + chartEndY - (data[6].sleep / standardTime) * 40 - (data[6].waka / standardTime) * 40 - (data[6].fit / standardTime) * 40}%" width="10%" height="${(data[6].fit / standardTime) * 40}%"/>
          </g>
    
          <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
            <g id="infoText">
              <g id="day">
                <text x="${chartStartX + dx[0] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[0].date}</text>
                <text x="${chartStartX + dx[1] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[1].date}</text>
                <text x="${chartStartX + dx[2] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[2].date}</text>
                <text x="${chartStartX + dx[3] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[3].date}</text>
                <text x="${chartStartX + dx[4] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[4].date}</text>
                <text x="${chartStartX + dx[5] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[5].date}</text>
                <text x="${chartStartX + dx[6] + 5}%" y="${chartStartY + chartEndY + 4}%">${data[6].date}</text>
              </g>
              <text x="${chartStartX - 6}%" y="${chartStartY -2}%">Hour</text>
              <text x="${chartStartX - 4}%" y="${chartStartY +4}%">${standardTime}</text>
              <text x="${chartStartX - 2}%" y="${chartStartY + chartEndY - 2}%">0</text>

              <text x="${chartStartX + chartEndX - 4}%" y="${chartStartY -2}%">Commit</text>
              <text x="${chartStartX + chartEndX + 1}%" y="${chartStartY +4}%">${maxCommit}</text>
              <text x="${chartStartX + chartEndX + 1}%" y="${chartStartY + chartEndY - 2}%">0</text>
            </g>
            <polyline points="${500 * (chartStartX + dx[0] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[0].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[1] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[1].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[2] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[2].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[3] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[3].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[4] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[4].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[5] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[5].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[6] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[6].commits/maxCommit) * 200}"/>
    
    
            <text id="title" x="50%" y="25%">${username}'s health stats</text>
          </svg>
        </svg>
      </svg>
    `;
    
    res.send(svg);
}