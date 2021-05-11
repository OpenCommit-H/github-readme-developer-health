const chartThemes = require("../../themes/chartTheme");

<<<<<<< HEAD
const renderChartCard = (data, username, themes) => {
    var svgSizeWidth = 500;
    var svgSizeHeight = 500;
=======
const renderChartCard = (data, wakaname, themes) => {
    var svgSizeWidth = 200;
    var svgSizeHeight = 200;
>>>>>>> a6a78f57838522724fb7db27839fc6e76105bee0

    
    var chartStartX = 15;
    var chartStartY = 40;
    var chartEndX = 70;
    var chartEndY = 40;
    
    var standardTime = 24;
    
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

    const theme = themes ? chartThemes[themes] : chartThemes["defaultTheme"];
    
    var minus = [-1, 1];

    var sleepData = data.map((element, idx) => {
        const output = `
        <rect class="bar" x="${chartStartX + dx[idx] + 1}%" y="${chartStartY + chartEndY - (element.sleep / standardTime) * 40}%" width="8%" height="${(element.sleep / standardTime) * 40}%" rx="2" ry="2">
            <animate attributeName="height" dur="1s"
            from="0%"
            to="${(element.sleep / standardTime) * 40}%"
            begin="0s"
            fill="freeze"/>
            <animate attributeName="y" dur="1s"
            from="40%"
            to="${chartStartY + chartEndY - (element.sleep / standardTime) * 40}%"
            begin="0s"
            fill="freeze"/>
        </rect>
        `;
        return output;
    }).join("");

    var wakaData = data.map((element, idx) => {
        const output = `
        <rect class="bar" x="${chartStartX + dx[idx] + 1}%" y="${chartStartY + chartEndY - (element.sleep / standardTime) * 40 - (element.waka / standardTime) * 40}%" width="8%" height="${(element.waka / standardTime) * 40}%" rx="2" ry="2">
            <animate attributeName="height" dur="1.5s"
            from="0%"
            to="${(element.waka / standardTime) * 40}%"
            begin="0s"
            fill="freeze"/>
            <animate attributeName="y" dur="1.5s"
            from="40%"
            to="${chartStartY + chartEndY - (element.sleep / standardTime) * 40 - (element.waka / standardTime) * 40}%"
            begin="0s"
            fill="freeze"/>
        </rect>
        `;
        return output;
    }).join("");

    var fitData = data.map((element, idx) => {
        const output = `
        <rect class="bar" x="${chartStartX + dx[idx] + 1}%" y="${chartStartY + chartEndY - (element.sleep / standardTime) * 40 - (element.waka / standardTime) * 40 - (element.fit / standardTime) * 40}%" width="8%" height="${(element.fit / standardTime) * 40}%" rx="2" ry="2">
            <animate attributeName="height" dur="2s"
            from="0%"
            to="${(element.fit / standardTime) * 40}%"
            begin="0s"
            fill="freeze"/>
            <animate attributeName="y" dur="2s"
            from="40%"
            to="${chartStartY + chartEndY - (element.sleep / standardTime) * 40 - (element.waka / standardTime) * 40 - (element.fit / standardTime) * 40}%"
            begin="0s"
            fill="freeze"/>
        </rect>
        `;
        return output;
    }).join("");


    var style = `
        <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(90)">
                <stop offset="5%"  stop-color=${theme.gradientStart} />
                <stop offset="95%" stop-color=${theme.gradientEnd} />
            </linearGradient>
        </defs>
        <style>
        circle {
            fill: url('#myGradient');
            stroke: ${theme.circleLine};
            stroke-width: 0.4px;
        }
        .bar {
            stroke: ${theme.barLine};
            stroke-width: 0.3px;
        }
        text {
            fill: ${theme.text};
            stroke-width: 0.3px;
        }
        #title {
            text-anchor: middle;
            font: bold 25px sans-selif;
        }
        #day {
            text-anchor: middle;
        }
        polyline {
            fill:none;
            stroke:${theme.polyline};
            stroke-width:4;
        }
        .commit {
            fill:${theme.polyline};
        }
        #chart {
            stroke:${theme.chartLine};
            stroke-width:0.4px;
        }
        .sleep {
            fill: ${theme.sleep};
        }
        .waka {
            fill: ${theme.waka};
        }
        .fit {
            fill: ${theme.fit};
        }
        </style>
    `;
    
    var svg = `
      <svg version="1.1" width="${svgSizeWidth}" height="${svgSizeHeight}" xmlns="http://www.w3.org/2000/svg>
        <svg width="100%" height="100%">
        ${style}
          <circle cx="50%" cy="50%" r="48%"/>
          <rect id="chart" fill="none" x="${chartStartX}%" y="${chartStartY}%" width="${chartEndX}%" height="${chartEndY}%"/>
<<<<<<< HEAD
          
          <animate attributeName="height" dur="2s"
          from="0"
          to="100"
          begin="0s"
          fill="freeze" restart="whenNotActive" /> 
          <g class="sleep" >
            <rect class="bar" x="${chartStartX + dx[0] + 1}%" y="${chartStartY + chartEndY - (data[0].sleep / standardTime) * 40}%" width="8%" height="${(data[0].sleep / standardTime) * 40}%" rx="2" ry="2"/>
            <rect class="bar" x="${chartStartX + dx[1] + 1}%" y="${chartStartY + chartEndY - (data[1].sleep / standardTime) * 40}%" width="8%" height="${(data[1].sleep / standardTime) * 40}%" rx="2" ry="2"/>
            <rect class="bar" x="${chartStartX + dx[2] + 1}%" y="${chartStartY + chartEndY - (data[2].sleep / standardTime) * 40}%" width="8%" height="${(data[2].sleep / standardTime) * 40}%" rx="2" ry="2"/>
            <rect class="bar" x="${chartStartX + dx[3] + 1}%" y="${chartStartY + chartEndY - (data[3].sleep / standardTime) * 40}%" width="8%" height="${(data[3].sleep / standardTime) * 40}%" rx="2" ry="2"/>
            <rect class="bar" x="${chartStartX + dx[4] + 1}%" y="${chartStartY + chartEndY - (data[4].sleep / standardTime) * 40}%" width="8%" height="${(data[4].sleep / standardTime) * 40}%" rx="2" ry="2"/>
            <rect class="bar" x="${chartStartX + dx[5] + 1}%" y="${chartStartY + chartEndY - (data[5].sleep / standardTime) * 40}%" width="8%" height="${(data[5].sleep / standardTime) * 40}%" rx="2" ry="2"/>
            
            
            
            <rect class="bar" x="${chartStartX + dx[6] + 1}%" y="${chartStartY + chartEndY - (data[6].sleep / standardTime) * 40}%" width="8%" height="${(data[6].sleep / standardTime) * 40}%" rx="2" ry="2"/>
=======
    
          <g class="sleep">
           ${sleepData}
>>>>>>> b976183f0606191f7d394c3a38ea2109d1db69ba
            <rect class="bar" x="${chartStartX + 5}%" y="${chartStartY - 10}%" width="2%" height="2%" />
            
            
        


          </g>
          <g class="waka">
            ${wakaData}
            <rect class="bar" x="${chartStartX + 20}%" y="${chartStartY - 10}%" width="2%" height="2%" />
          </g>
    
          <g class="fit">
            ${fitData}
            <rect class="bar" x="${chartStartX + 35}%" y="${chartStartY - 10}%" width="2%" height="2%" />
          </g>

          <rect class="commit" x="${chartStartX + 50}%" y="${chartStartY - 10}%" width="2%" height="2%" />
    
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
              <text x="${chartStartX - 5}%" y="${chartStartY +4}%">${standardTime}</text>
              <text x="${chartStartX - 2}%" y="${chartStartY + chartEndY - 2}%">0</text>

              <text x="${chartStartX + chartEndX - 4}%" y="${chartStartY -2}%">Commit</text>
              <text x="${chartStartX + chartEndX + 1}%" y="${chartStartY +4}%">${maxCommit}</text>
              <text x="${chartStartX + chartEndX + 1}%" y="${chartStartY + chartEndY - 2}%">0</text>
            </g>
            <g>
              <text class="sleep" x="${chartStartX + 8}%" y="${chartStartY - 8}%">sleep</text>
              <text class="waka" x="${chartStartX + 23}%" y="${chartStartY - 8}%">waka</text>
              <text class="fit" x="${chartStartX + 38}%" y="${chartStartY - 8}%">fitness</text>
              <text class="commit" x="${chartStartX + 53}%" y="${chartStartY - 8}%">commits</text>
            </g>
            <polyline points="${500 * (chartStartX + dx[0] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[0].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[1] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[1].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[2] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[2].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[3] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[3].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[4] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[4].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[5] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[5].commits/maxCommit) * 200} 
                              ${500 * (chartStartX + dx[6] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[6].commits/maxCommit) * 200}">

            <animate attributeName="points" dur="2s"
            from="${500 * (chartStartX + dx[0] + 5)/100},${500 * (chartStartY + chartEndY)/100}
            ${500 * (chartStartX + dx[1] + 5)/100},${500 * (chartStartY + chartEndY)/100}
            ${500 * (chartStartX + dx[2] + 5)/100},${500 * (chartStartY + chartEndY)/100}
            ${500 * (chartStartX + dx[3] + 5)/100},${500 * (chartStartY + chartEndY)/100}
            ${500 * (chartStartX + dx[4] + 5)/100},${500 * (chartStartY + chartEndY)/100}
            ${500 * (chartStartX + dx[5] + 5)/100},${500 * (chartStartY + chartEndY)/100}
            ${500 * (chartStartX + dx[6] + 5)/100},${500 * (chartStartY + chartEndY)/100}"
            to="${500 * (chartStartX + dx[0] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[0].commits/maxCommit) * 200} 
            ${500 * (chartStartX + dx[1] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[1].commits/maxCommit) * 200} 
            ${500 * (chartStartX + dx[2] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[2].commits/maxCommit) * 200} 
            ${500 * (chartStartX + dx[3] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[3].commits/maxCommit) * 200} 
            ${500 * (chartStartX + dx[4] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[4].commits/maxCommit) * 200} 
            ${500 * (chartStartX + dx[5] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[5].commits/maxCommit) * 200} 
            ${500 * (chartStartX + dx[6] + 5)/100},${500 * (chartStartY + chartEndY)/100 - (data[6].commits/maxCommit) * 200}"
            begin="0s"
            fill="freeze"/>
            </polyline>
    
    
            <text id="title" x="50%" y="25%">${wakaname}'s health stats</text>
          </svg>
        </svg>
      </svg>
    `;

    return svg;
};

module.exports = renderChartCard;
