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
      <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur"/>
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
      }else if(level3<monthActive[i][1]){
        commitColor += `#commit${i} {fill: ${selectTheme.level3Color};}`
      }
    }else{
      commitColor += `#commit${i} {fill: ${selectTheme.level0Color};}`
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
          text {
            font-family: 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
          }
        </style>
        <defs>
          ${filterSvg}
        </defs>
        <g id="describe">
          <path id="Health Commit" d="M223.02 23.13V56.02L225.715 56.075V58H211.195V56.075L213.89 56.02V40.73H201.57V56.02L204.265 56.075V58H189.745V56.075L192.44 56.02V23.13L189.745 23.075V21.15H204.265V23.075L201.57 23.13V38.695H213.89V23.13L211.195 23.075V21.15H225.715V23.075L223.02 23.13ZM240.707 32.425C243.934 32.425 246.464 33.5983 248.297 35.945C250.167 38.255 251.084 41.39 251.047 45.35L235.867 45.845C236.124 48.0083 236.875 49.6583 238.122 50.795C239.369 51.9317 241.019 52.5 243.072 52.5C245.932 52.5 248.26 51.7117 250.057 50.135L251.047 51.015C249.764 53.4717 248.022 55.3967 245.822 56.79C243.659 58.1467 241.349 58.825 238.892 58.825C235.555 58.825 232.897 57.725 230.917 55.525C228.974 53.2883 228.002 50.2817 228.002 46.505C228.002 44.2683 228.442 42.05 229.322 39.85C230.239 37.65 231.394 35.8167 232.787 34.35C233.74 33.8 234.969 33.3417 236.472 32.975C237.975 32.6083 239.387 32.425 240.707 32.425ZM242.907 43.535C242.87 40.9683 242.504 38.9333 241.807 37.43C241.11 35.9267 240.12 35.0283 238.837 34.735C237.92 35.6883 237.169 37.0267 236.582 38.75C236.032 40.4367 235.757 42.1783 235.757 43.975V44.14L242.907 43.535ZM275.146 55.14L267.061 58.935C266.071 58.2383 265.393 57.285 265.026 56.075C263.706 56.8817 262.368 57.5417 261.011 58.055C259.691 58.5683 258.536 58.825 257.546 58.825C256.043 58.825 254.815 58.2933 253.861 57.23C252.908 56.1667 252.431 54.81 252.431 53.16C252.431 52.4267 252.505 51.6383 252.651 50.795C252.835 49.915 253.055 49.2183 253.311 48.705L264.971 46.835L265.081 45.24C265.155 43.59 264.806 42.3067 264.036 41.39C263.266 40.4367 262.02 39.96 260.296 39.96C259.526 39.96 258.72 40.0517 257.876 40.235C257.033 40.3817 256.318 40.5833 255.731 40.84L254.851 42.71L253.366 42.16L255.896 34.24C258.72 33.03 261.396 32.425 263.926 32.425C266.53 32.425 268.656 33.1217 270.306 34.515C271.956 35.8717 272.781 38.0167 272.781 40.95L272.726 42.05L272.176 49.475L272.066 51.455C272.066 52.115 272.121 52.6467 272.231 53.05C272.341 53.4167 272.525 53.8017 272.781 54.205L274.486 53.545L275.146 55.14ZM262.661 54.865C263.248 54.865 263.926 54.645 264.696 54.205L264.641 53.05L264.696 51.84L264.861 48.705L260.626 49.695C260.48 50.1717 260.406 50.8133 260.406 51.62C260.406 52.72 260.626 53.545 261.066 54.095C261.506 54.6083 262.038 54.865 262.661 54.865ZM276.073 56.405L278.108 56.24L277.833 23.295L275.743 23.735L275.193 22.14L285.368 19.06L286.138 20.38L285.863 56.24L287.898 56.405V58H276.073V56.405ZM307.042 53.655L300.332 58.495C297.619 58.495 295.639 57.835 294.392 56.515C293.182 55.1583 292.577 52.995 292.577 50.025V35.395H288.892V33.635C290.432 32.7917 292.1 31.6 293.897 30.06C295.73 28.4833 297.399 26.8333 298.902 25.11L300.717 25.66L300.442 33.25H306.877V35.56L300.332 35.45V48.1C300.332 49.86 300.662 51.1433 301.322 51.95C302.019 52.7567 302.935 53.16 304.072 53.16L306.107 52.005L307.042 53.655ZM334.488 56.405V58H322.718V56.405L324.753 56.24V44.635C324.753 43.0217 324.294 41.775 323.378 40.895C322.498 40.015 321.269 39.5567 319.693 39.52L317.878 41.335L317.768 56.24L319.803 56.405V58H307.978V56.405L310.013 56.24L309.738 23.295L307.648 23.735L307.098 22.14L317.273 19.06L318.043 20.38L317.878 38.695L322.333 32.315C325.816 32.315 328.383 33.14 330.033 34.79C331.683 36.44 332.508 38.9883 332.508 42.435V56.24L334.488 56.405ZM367.303 52.5C368.916 52.5 370.474 52.17 371.978 51.51C373.481 50.85 374.874 49.8967 376.158 48.65L377.588 50.245C373.078 55.965 367.908 58.825 362.078 58.825C358.741 58.825 355.826 58.0733 353.333 56.57C350.876 55.0667 348.969 52.94 347.613 50.19C346.256 47.44 345.578 44.2133 345.578 40.51C345.578 37.32 346.183 34.24 347.393 31.27C348.639 28.2633 350.216 25.8617 352.123 24.065C353.993 22.855 355.991 21.9383 358.118 21.315C360.281 20.655 362.408 20.325 364.498 20.325C367.284 20.325 369.833 20.93 372.143 22.14C374.489 23.3133 376.341 24.9633 377.698 27.09L370.933 32.755C369.026 29.3817 366.734 25.7333 364.058 21.81C362.444 22.47 360.978 23.6067 359.658 25.22C358.338 26.8333 357.293 28.7583 356.523 30.995C355.789 33.2317 355.423 35.56 355.423 37.98C355.423 42.6 356.449 46.175 358.503 48.705C360.593 51.235 363.526 52.5 367.303 52.5ZM391.632 32.425C395.299 32.425 398.25 33.5067 400.487 35.67C402.724 37.8333 403.842 40.9133 403.842 44.91C403.842 46.6333 403.53 48.4117 402.907 50.245C402.32 52.0783 401.44 53.6917 400.267 55.085C399.094 56.2217 397.719 57.1383 396.142 57.835C394.602 58.495 392.97 58.825 391.247 58.825C387.58 58.825 384.629 57.7433 382.392 55.58C380.155 53.4167 379.037 50.3367 379.037 46.34C379.037 44.6533 379.349 42.8933 379.972 41.06C380.595 39.2267 381.494 37.6133 382.667 36.22C383.84 35.0833 385.197 34.1667 386.737 33.47C388.314 32.7733 389.945 32.425 391.632 32.425ZM386.957 43.7C386.957 47.1833 387.635 49.7867 388.992 51.51C390.385 53.2333 392.42 54.26 395.097 54.59C395.354 53.49 395.555 52.2617 395.702 50.905C395.849 49.5483 395.922 48.43 395.922 47.55C395.922 44.03 395.225 41.4267 393.832 39.74C392.475 38.0167 390.477 36.99 387.837 36.66C387.58 37.7967 387.36 39.0433 387.177 40.4C387.03 41.7567 386.957 42.8567 386.957 43.7ZM446.334 56.405V58H434.564V56.405L436.599 56.24V44.635C436.599 43.0217 436.178 41.775 435.334 40.895C434.528 39.9783 433.391 39.5017 431.924 39.465L429.889 41.5V42.435V56.24L431.869 56.405V58H420.099V56.405L422.134 56.24V44.635C422.134 43.0217 421.713 41.775 420.869 40.895C420.063 40.015 418.926 39.5567 417.459 39.52L415.644 41.335L415.424 56.24L417.459 56.405V58H405.634V56.405L407.669 56.24L407.504 36.55L405.414 37.045L404.864 35.395L413.554 32.7L415.479 38.86L420.044 32.315C422.868 32.315 425.049 32.8833 426.589 34.02C428.166 35.1567 429.174 36.9167 429.614 39.3L434.509 32.26C437.883 32.26 440.358 33.085 441.934 34.735C443.548 36.385 444.354 38.9517 444.354 42.435V56.24L446.334 56.405ZM489.142 56.405V58H477.372V56.405L479.407 56.24V44.635C479.407 43.0217 478.985 41.775 478.142 40.895C477.335 39.9783 476.199 39.5017 474.732 39.465L472.697 41.5V42.435V56.24L474.677 56.405V58H462.907V56.405L464.942 56.24V44.635C464.942 43.0217 464.52 41.775 463.677 40.895C462.87 40.015 461.734 39.5567 460.267 39.52L458.452 41.335L458.232 56.24L460.267 56.405V58H448.442V56.405L450.477 56.24L450.312 36.55L448.222 37.045L447.672 35.395L456.362 32.7L458.287 38.86L462.852 32.315C465.675 32.315 467.857 32.8833 469.397 34.02C470.974 35.1567 471.982 36.9167 472.422 39.3L477.317 32.26C480.69 32.26 483.165 33.085 484.742 34.735C486.355 36.385 487.162 38.9517 487.162 42.435V56.24L489.142 56.405ZM493.89 21.645L500.93 20.05V26.32L493.89 27.365V21.645ZM501.48 56.24L503.515 56.405V58H491.69V56.405L493.725 56.24L493.56 36.66L491.47 37.1L490.92 35.505L500.875 32.425L501.645 33.745L501.48 56.24ZM523.121 53.655L516.411 58.495C513.698 58.495 511.718 57.835 510.471 56.515C509.261 55.1583 508.656 52.995 508.656 50.025V35.395H504.971V33.635C506.511 32.7917 508.18 31.6 509.976 30.06C511.81 28.4833 513.478 26.8333 514.981 25.11L516.796 25.66L516.521 33.25H522.956V35.56L516.411 35.45V48.1C516.411 49.86 516.741 51.1433 517.401 51.95C518.098 52.7567 519.015 53.16 520.151 53.16L522.186 52.005L523.121 53.655Z" fill="black"/>
          <text id="month" fill="black" xml:space="preserve" style="white-space: pre" font-size="35" letter-spacing="0em" alignment-baseline="middle" text-anchor="middle"><tspan x="50%" y="100.424">${username}'s ${month[selectedMonth-1]}</tspan></text>
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
