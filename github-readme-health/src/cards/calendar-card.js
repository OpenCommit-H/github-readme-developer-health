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
    name,
    step,
    distance,
    active_minutes,
    heart_level,
    heart_minutes,
    sleep,
    animal,
    rank,
  } = abc;
  var calendarSvg = "";
  for (i=0; i<35; i++){
    calendarSvg += `
    <g id="Rectangle ${i+1}" filter="url(#filter${34-i}_f)">
    <rect x="${5+(i%7)*100}" y="${156+parseInt((i/7)%7)*100}" width="100" height="100" fill="white"/>
    <rect x="${4.5+(i%7)*100}" y="${155.5+parseInt((i/7)%7)*100}" width="101" height="101" stroke="black"/>
    </g>`
  }
  var filterSvg = "";
  for (i=0; i<35; i++){
    filterSvg += `
    <filter id="filter${i}_f" x="${600-(i%7)*100}" y="${551-parseInt((i/7)%7)*100}" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
    </filter>`
  }
  return `
  <svg width="355" height="330.5" viewBox="0 0 710 661" xmlns="http://www.w3.org/2000/svg">

<svg width="710" height="661" viewBox="0 0 710 661" fill="none" xmlns="http://www.w3.org/2000/svg">
${calendarSvg}
<g id="week">
<text id="SAT" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="639.566" y="135.909">SAT</tspan></text>
<text id="FRI" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="540.99" y="135.909">FRI</tspan></text>
<text id="THU" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="436.596" y="135.909">THU</tspan></text>
<text id="WED" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="334.179" y="135.909">WED</tspan></text>
<text id="TUE" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="238.011" y="135.909">TUE</tspan></text>
<text id="MON" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="134.082" y="135.909">MON</tspan></text>
<text id="SUN" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="18" letter-spacing="0em"><tspan x="36.8857" y="135.909">SUN</tspan></text>
</g>
<g id="title">
<text id="clalsw&#226;&#128;&#153;s health commit" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="48" letter-spacing="0em"><tspan x="143.008" y="50.424">clalsw&#x2019;s health commit</tspan></text>
<text id="january" fill="black" xml:space="preserve" style="white-space: pre" font-family="Rakkas" font-size="48" letter-spacing="0em"><tspan x="283.586" y="100.424">january</tspan></text>
</g>
<defs>
${filterSvg}
</defs>
</svg>
  <text x="120" y="180">1</text>
  <text x="120" y="200">${active_minutes[0]}분</text>
  <text x="220" y="180">2</text>
  <text x="220" y="200">${active_minutes[1]}분</text>
  <text x="320" y="180">3</text>
  <text x="320" y="200">${active_minutes[2]}분</text>
  <text x="420" y="180">4</text>
  <text x="420" y="200">${active_minutes[3]}분</text>
  <text x="520" y="180">5</text>
  <text x="620" y="180">6</text>
  <text x="720" y="180">7</text>
  <text x="20" y="280">8</text>
</svg>


  `
};

module.exports = calendarCard;
