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

const createTextNode = ({
  icon,
  label,
  value,
  id,
  index,
  showIcons,
  shiftValuePos,
}) => {
  const kValue = kFormatter(value);
  const staggerDelay = (index + 3) * 150;

  const labelOffset = showIcons ? `x="25"` : "";
  const iconSvg = showIcons
    ? `
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      ${icon}
    </svg>
  `
    : "";
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      ${iconSvg}
      <text class="stat bold" ${labelOffset} y="12.5">${label}:</text>
      <text 
        class="stat" 
        x="${(showIcons ? 140 : 120) + shiftValuePos}" 
        y="12.5" 
        data-testid="${id}"
      >${kValue}</text>
    </g>
  `;
};

const calendarCard = (abc = {}, options = { hide: [] }) => {
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
  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    hide_rank = false,
    include_all_commits = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    custom_title,
    border_radius,
    border_color,
    locale,
    disable_animations = false,
  } = options;

  const lheight = parseInt(line_height, 10);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor, borderColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    border_color,
    theme,
  });

  const apostrophe = ["x", "s"].includes(name.slice(-1).toLocaleLowerCase())
    ? ""
    : "s";
  const i18n = new I18n({
    locale,
    translations: statCardLocales({ name, apostrophe }),
  });

  // Meta data for creating text nodes with createTextNode function
  const STATS = {
    step: {
      icon: icons.step,
      label: "step",
      value: step,
      id: "step",
    },
    distance: {
      icon: icons.distance,
      label: "distance",
      value: distance,
      id: "distance",
    },
    active_minutes: {
      icon: icons.active_minutes,
      label: "active_minutes",
      value: active_minutes,
      id: "active_minutes",
    },
    heart_level: {
      icon: icons.heart_level,
      label: "heart_level",
      value: heart_level,
      id: "heart_level",
    },
    heart_minutes: {
      icon: icons.heart_minutes,
      label: "heart_minutes",
      value: heart_minutes,
      id: "heart_minutes",
    },
    sleep: {
      icon: icons.sleep,
      label: "sleep",
      value: sleep,
      id: "sleep",
    },
    animal: {
      icon: icons.animal,
      label: "animal",
      value: animal,
      id: "animal",
    },
  };

  const longLocales = ["cn", "es", "fr", "pt-br", "ru", "uk-ua", "id", "my", "pl"];
  const isLongLocale = longLocales.includes(locale) === true;

  // filter out hidden stats defined by user & create the text nodes
  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        ...STATS[key],
        index,
        showIcons: show_icons,
        shiftValuePos:
          (!include_all_commits ? 50 : 20) + (isLongLocale ? 50 : 0),
      }),
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150,
  );
    var stats = {
      name: name,
      animal: animal,
      drink: 4,
      theme: "default"
    };
  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `
    <g data-testid="rank-circle" 
          transform="translate(280, -30)">
    ${renderTestCard(stats)}
    </g>`

  // the better user's score the the rank will be closer to zero so
  // subtracting 100 to get the progress in 100%
  const progress = 100 - rank.score;
  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
    progress,
  });

  const calculateTextWidth = () => {
    return measureText(custom_title ? custom_title : `${name}'s Health Stats`);
  };

  const width = hide_rank
    ? clampValue(
        50 /* padding */ + calculateTextWidth() * 2,
        270 /* min */,
        Infinity,
      )
    : 495;

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: `${name}'s Health Stats`,
    width,
    height,
    border_radius,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
      borderColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);

  if (disable_animations) card.disableAnimations();

  return `
  <svg width="355" height="330.5" viewBox="0 0 710 661" xmlns="http://www.w3.org/2000/svg">
<style>
  .small { font: italic 13px sans-serif; }
  .heavy { font: bold 30px sans-serif; }

  /* Note that the color of the text is set with the    *
    * fill property, the color property is for HTML only */
  .Rrrrr { font: italic 40px serif; fill: red; }
</style>
<svg width="710" height="661" viewBox="0 0 710 661" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="calendar">
<g id="Group 35">
<g id="Rectangle 35" filter="url(#filter0_f)">
<rect x="605" y="556" width="100" height="100" fill="white"/>
<rect x="604.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 34">
<g id="Rectangle 34" filter="url(#filter1_f)">
<rect x="505" y="556" width="100" height="100" fill="white"/>
<rect x="504.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 33">
<g id="Rectangle 33" filter="url(#filter2_f)">
<rect x="405" y="556" width="100" height="100" fill="white"/>
<rect x="404.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 32">
<g id="Rectangle 32" filter="url(#filter3_f)">
<rect x="305" y="556" width="100" height="100" fill="white"/>
<rect x="304.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 31">
<g id="Rectangle 31" filter="url(#filter4_f)">
<rect x="205" y="556" width="100" height="100" fill="white"/>
<rect x="204.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 30">
<g id="Rectangle 30" filter="url(#filter5_f)">
<rect x="105" y="556" width="100" height="100" fill="white"/>
<rect x="104.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 29">
<g id="Rectangle 29" filter="url(#filter6_f)">
<rect x="5" y="556" width="100" height="100" fill="white"/>
<rect x="4.5" y="555.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 28">
<g id="Rectangle 28" filter="url(#filter7_f)">
<rect x="605" y="456" width="100" height="100" fill="white"/>
<rect x="604.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 27">
<g id="Rectangle 27" filter="url(#filter8_f)">
<rect x="505" y="456" width="100" height="100" fill="white"/>
<rect x="504.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 26">
<g id="Rectangle 26" filter="url(#filter9_f)">
<rect x="405" y="456" width="100" height="100" fill="white"/>
<rect x="404.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 25">
<g id="Rectangle 25" filter="url(#filter10_f)">
<rect x="305" y="456" width="100" height="100" fill="white"/>
<rect x="304.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 24">
<g id="Rectangle 24" filter="url(#filter11_f)">
<rect x="205" y="456" width="100" height="100" fill="white"/>
<rect x="204.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 23">
<g id="Rectangle 23" filter="url(#filter12_f)">
<rect x="105" y="456" width="100" height="100" fill="white"/>
<rect x="104.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 22">
<g id="Rectangle 22" filter="url(#filter13_f)">
<rect x="5" y="456" width="100" height="100" fill="white"/>
<rect x="4.5" y="455.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 21">
<g id="Rectangle 21" filter="url(#filter14_f)">
<rect x="605" y="356" width="100" height="100" fill="white"/>
<rect x="604.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 20">
<g id="Rectangle 20" filter="url(#filter15_f)">
<rect x="505" y="356" width="100" height="100" fill="white"/>
<rect x="504.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 19">
<g id="Rectangle 19" filter="url(#filter16_f)">
<rect x="405" y="356" width="100" height="100" fill="white"/>
<rect x="404.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 18">
<g id="Rectangle 18" filter="url(#filter17_f)">
<rect x="305" y="356" width="100" height="100" fill="white"/>
<rect x="304.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 17">
<g id="Rectangle 17" filter="url(#filter18_f)">
<rect x="205" y="356" width="100" height="100" fill="white"/>
<rect x="204.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 16">
<g id="Rectangle 16" filter="url(#filter19_f)">
<rect x="105" y="356" width="100" height="100" fill="white"/>
<rect x="104.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 15">
<g id="Rectangle 15" filter="url(#filter20_f)">
<rect x="5" y="356" width="100" height="100" fill="white"/>
<rect x="4.5" y="355.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 14">
<g id="Rectangle 14" filter="url(#filter21_f)">
<rect x="605" y="256" width="100" height="100" fill="white"/>
<rect x="604.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 13">
<g id="Rectangle 13" filter="url(#filter22_f)">
<rect x="505" y="256" width="100" height="100" fill="white"/>
<rect x="504.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 12">
<g id="Rectangle 12" filter="url(#filter23_f)">
<rect x="405" y="256" width="100" height="100" fill="white"/>
<rect x="404.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 11">
<g id="Rectangle 11" filter="url(#filter24_f)">
<rect x="305" y="256" width="100" height="100" fill="white"/>
<rect x="304.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 10">
<g id="Rectangle 10" filter="url(#filter25_f)">
<rect x="205" y="256" width="100" height="100" fill="white"/>
<rect x="204.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 9">
<g id="Rectangle 9" filter="url(#filter26_f)">
<rect x="105" y="256" width="100" height="100" fill="white"/>
<rect x="104.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 8">
<g id="Rectangle 8" filter="url(#filter27_f)">
<rect x="5" y="256" width="100" height="100" fill="white"/>
<rect x="4.5" y="255.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 7">
<g id="Rectangle 7" filter="url(#filter28_f)">
<rect x="605" y="156" width="100" height="100" fill="white"/>
<rect x="604.5" y="155.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 6">
<g id="Rectangle 6" filter="url(#filter29_f)">
<rect x="505" y="156" width="100" height="100" fill="white"/>
<rect x="504.5" y="155.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 5">
<g id="Rectangle 5" filter="url(#filter30_f)">
<rect x="405" y="156" width="100" height="100" fill="white"/>
<rect x="404.5" y="155.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 4">
<g id="Rectangle 4" filter="url(#filter31_f)">
<rect x="305" y="156" width="100" height="100" fill="white"/>
<rect x="304.5" y="155.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 3">
<g id="Rectangle 3" filter="url(#filter32_f)">
<rect x="205" y="156" width="100" height="100" fill="white"/>
<rect x="204.5" y="155.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 2">
<g id="Rectangle 2" filter="url(#filter33_f)">
<rect x="105" y="156" width="100" height="100" fill="white"/>
<rect x="104.5" y="155.5" width="101" height="101" stroke="black"/>
</g>
</g>
<g id="Group 1">
<g id="Rectangle 1" filter="url(#filter34_f)">
<rect x="5" y="156" width="100" height="100" fill="white"/>
<rect x="4.5" y="155.5" width="101" height="101" stroke="black"/>
<text x="120" y="180">1dddddd</text>
</g>
</g>
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
</g>
<defs>
<filter id="filter0_f" x="600" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter1_f" x="500" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter2_f" x="400" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter3_f" x="300" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter4_f" x="200" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter5_f" x="100" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter6_f" x="0" y="551" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter7_f" x="600" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter8_f" x="500" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter9_f" x="400" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter10_f" x="300" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter11_f" x="200" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter12_f" x="100" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter13_f" x="0" y="451" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter14_f" x="600" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter15_f" x="500" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter16_f" x="400" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter17_f" x="300" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter18_f" x="200" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter19_f" x="100" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter20_f" x="0" y="351" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter21_f" x="600" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter22_f" x="500" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter23_f" x="400" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter24_f" x="300" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter25_f" x="200" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter26_f" x="100" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter27_f" x="0" y="251" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter28_f" x="600" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter29_f" x="500" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter30_f" x="400" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter31_f" x="300" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter32_f" x="200" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter33_f" x="100" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter34_f" x="0" y="151" width="110" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
</filter>
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
