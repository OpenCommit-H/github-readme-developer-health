const I18n = require("../common/I18n");
const Card = require("../common/Card");
const icons = require("../common/icons");
const renderTestCard = require("./animal-card");
const { getStyles } = require("../getStyles");
const { statCardLocales } = require("../translations");
const {
  kFormatter,
  FlexLayout,
  clampValue,
  measureText,
  getCardColors,
} = require("../common/utils");


const calendarCard = (abc = {}) => {
  const {
    active_minutes,
    start_day,
    selectedMonth,
    username,
    size,
  } = abc;
  var calendarSvg = "";
  for (i=0; i<42; i++){
    calendarSvg += `
    <g id="Rectangle ${i+1}" filter="url(#filter${41-i}_f)">
    <rect id="commit${i+1}" x="${5+(i%7)*100}" y="${156+parseInt((i/7)%7)*100}" width="100" height="100" rx="30" ry="30"/>
    <rect x="${4.5+(i%7)*100}" y="${155.5+parseInt((i/7)%7)*100}" width="101" height="101" stroke="black" rx="30" ry="30"/>
    </g>`
  }
  var filterSvg = "";
  for (i=0; i<42; i++){
    filterSvg += `
    <filter id="filter${i}_f" x="${600-(i%7)*100}" y="${651-parseInt((i/7)%7)*100}" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
    </filter>`
  }

  var monthActive = new Array(42);
  var idx = 0;
  const month = ['Jan.', 'Feb.', 'Mar.', 'Apr', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov', 'Dec'];
  const weeks = ['SUM', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  idx = weeks.indexOf(start_day)
  commitColor = "";
  const level1 = 1;
  const level2 = 30;
  const level3= 90;
  for (i=0; i<active_minutes.length; i++){
    monthActive[i+idx] = [i+1, active_minutes[i]];
  }
  console.log(monthActive)
  for (i=0; i<monthActive.length; i++){
    if(monthActive[i]){
      if(monthActive[i][1]<level1){
        commitColor += `#commit${i+1} {fill: #ffffff;}`
      }else if(level1<=monthActive[i][1]&&monthActive[i][1]<level2){
        commitColor += `#commit${i+1} {fill: #C5E99B;}`
      }else if(level2<=monthActive[i][1]&&monthActive[i][1]<level3){
        commitColor += `#commit${i+1} {fill: #D499B9;}`
      }else{
        commitColor += `#commit${i+1} {fill: #9055A2;}`
      }
    }
  }

  var textNode = "";
  for (i=idx; i<idx+active_minutes.length; i++){
    textNode += `
    <text x="${20+(i%7)*100}" y="${180+parseInt((i/7)%7)*100}" font-size="25">${monthActive[i][0]}</text>
    `
    if (monthActive[i][1]){
      textNode += `
      <text x="${20+(i%7)*100}" y="${200+parseInt((i/7)%7)*100}" font-size="20">${monthActive[i][1]} Min</text>`
    }
  }
  return `
  <svg width="${71*size}" height="${76.1*size}" viewBox="0 0 710 761" xmlns="http://www.w3.org/2000/svg">

<svg width="710" height="761" viewBox="0 0 710 761" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
${commitColor}
#health commit{
}
#month{
}
</style>
${calendarSvg}
<g id="week">
<text id="SAT" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="639.566" y="135.909">SAT</tspan></text>
<text id="FRI" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="540.99" y="135.909">FRI</tspan></text>
<text id="THU" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="436.596" y="135.909">THU</tspan></text>
<text id="WED" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="334.179" y="135.909">WED</tspan></text>
<text id="TUE" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="238.011" y="135.909">TUE</tspan></text>
<text id="MON" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="134.082" y="135.909">MON</tspan></text>
<text id="SUN" fill="brown" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="20" font-weigh="900" letter-spacing="0em"><tspan x="36.8857" y="135.909">SUN</tspan></text>
</g>
<g id="title">
<text id="health commit" fill="brown" font-weigh="900" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="30" letter-spacing="0em" alignment-baseline="middle" text-anchor="middle"><tspan x="50%" y="50.424">${username}'s Health Commit</tspan></text>
<text id="month" fill="brown" font-weigh="900" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="28" letter-spacing="0em" alignment-baseline="middle" text-anchor="middle"><tspan x="50%" y="100.424">${month[selectedMonth-1]}</tspan></text>
</g>
<defs>
${filterSvg}
</defs>
</svg>
  ${textNode}
</svg>


  `
};

module.exports = calendarCard;
