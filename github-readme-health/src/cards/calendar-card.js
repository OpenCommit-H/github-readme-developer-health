const calendarThemes = require("../../themes/calendarThemes");

const calendarCard = (data = {}, options = {} ) => {
  const {
    active_minutes,
    start_day,
    selectedMonth,
    username,
  } = data;
  const {
    theme = "default",
    size = 5,
    outline = true,
    hide = false,
  } = options;

  const selectTheme = calendarThemes[theme];
  const month = ['Jan.', 'Feb.', 'Mar.', 'Apr', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov', 'Dec'];
  const weeks = ['SUM', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var monthActive = new Array(42);
  var activeDay = 0;
  var idx = 0;
  idx = weeks.indexOf(start_day);
  var lastIdx = idx+active_minutes.length;
  const calendarSize = lastIdx>35 ? lastIdx : 35;

  for (i=0; i<active_minutes.length; i++){
    monthActive[i+idx] = [i+1, active_minutes[i]];
    if (active_minutes[i]) {
      activeDay ++;
    }
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var totalTime = active_minutes.reduce(reducer);
  var avgTime = parseInt(totalTime/activeDay) ? parseInt(totalTime/activeDay) : 0;

  var calendarSvg = "";
  for (i=0; i<calendarSize; i++){
    calendarSvg += `<rect id="commit${i}" x="${5+(i%7)*100}" y="${156+parseInt((i/7)%7)*100}" width="100" height="100" rx="50" ry="50"/>`
    if (outline){
      calendarSvg +=`
        <g id="Rectangle ${i}" filter="url(#filter${i}_f)">
          <rect x="${4.5+(i%7)*100}" y="${155.5+parseInt((i/7)%7)*100}" width="101" height="101" stroke="black" rx="50" ry="50"/>
        </g>`
    }
  }

  var filterSvg = "";
  for (i=0; i<calendarSize; i++){
    filterSvg += `
    <filter id="filter${i}_f" x="${(i%7)*100}" y="${151+parseInt((i/7)%7)*100}" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
    </filter>`
  }

  commitColor = "";
  const level1 = 1;
  const level2 = 30;
  const level3= 90;
  for (i=0; i<monthActive.length; i++){
    if(monthActive[i]){
      if(monthActive[i][1]<level1){
        commitColor += `#commit${i} {fill: ${selectTheme.level0Color};}`
      }else if(level1<=monthActive[i][1]&&monthActive[i][1]<level2){
        commitColor += `#commit${i} {fill: ${selectTheme.level1Color};}`
      }else if(level2<=monthActive[i][1]&&monthActive[i][1]<level3){
        commitColor += `#commit${i} {fill: ${selectTheme.level2Color};}`
      }else{
        commitColor += `#commit${i} {fill: ${selectTheme.level3Color};}`
      }
    }
  }
  
  var textNode = "";
  for (i=idx; i<idx+active_minutes.length; i++){
    textNode += `
      <text x="${20+(i%7)*100}" y="${180+parseInt((i/7)%7)*100}" font-size="25">${monthActive[i][0]}</text>`
    if (monthActive[i][1]){
      textNode +=`
        <text x="${20+(i%7)*100}" y="${205+parseInt((i/7)%7)*100}" font-size="20">${monthActive[i][1]} Min</text>`
    }
  }
  var avgTime = parseInt(totalTime/activeDay) ? parseInt(totalTime/activeDay) : 0;
  var time = hide ? `` : `
  <text id="total" fill="black" xml:space="preserve" style="white-space: pre" font-size="28" letter-spacing="0em" alignment-baseline="middle" text-anchor="end"><tspan x="98%" y="690.424">total ${totalTime} Min</tspan></text>
  <text id="average" fill="black" xml:space="preserve" style="white-space: pre" font-size="28" letter-spacing="0em" alignment-baseline="middle" text-anchor="end"><tspan x="98%" y="730.424">average ${avgTime} Min</tspan></text>`;

  return `
    <svg width="${71*size}" height="${76.1*size}" viewBox="0 0 710 761" xmlns="http://www.w3.org/2000/svg">
      <svg width="710" height="761" viewBox="0 0 710 761" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          ${commitColor}
        </style>
        <defs>
          ${filterSvg}
        </defs>
        <g id="describe">
          <text id="health commit" fill="black" xml:space="preserve" style="white-space: pre" font-size="48" letter-spacing="0em" alignment-baseline="middle" text-anchor="middle"><tspan x="50%" y="50.424">Health Commit</tspan></text>
          <text id="january" fill="black" xml:space="preserve" style="white-space: pre" font-size="35" letter-spacing="0em" alignment-baseline="middle" text-anchor="middle"><tspan x="50%" y="100.424">${username}'s ${month[selectedMonth-1]}</tspan></text>
          ${time}
        </g>
        <g id="week">
          <text id="SAT" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="639.566" y="135.909">SAT</tspan></text>
          <text id="FRI" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="540.99" y="135.909">FRI</tspan></text>
          <text id="THU" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="436.596" y="135.909">THU</tspan></text>
          <text id="WED" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="334.179" y="135.909">WED</tspan></text>
          <text id="TUE" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="238.011" y="135.909">TUE</tspan></text>
          <text id="MON" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="134.082" y="135.909">MON</tspan></text>
          <text id="SUN" fill="black" xml:space="preserve" style="white-space: pre" font-size="20" letter-spacing="0em"><tspan x="36.8857" y="135.909">SUN</tspan></text>
        </g>
        ${calendarSvg}
      </svg>
      ${textNode}
    </svg>
  `
};

module.exports = calendarCard;
