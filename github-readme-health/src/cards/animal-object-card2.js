const I18n = require("../common/I18n");
const Card = require("../common/Card");
const icons = require("../common/icons");
const animals = require("../common/animals");
const drinks = require("../common/drinks");
const { getStyles } = require("../getStyles");
const { statCardLocales } = require("../translations");
const circleThemes = require("../../themes/circleThemes");
const {
  kFormatter,
  FlexLayout,
  clampValue,
  measureText,
  getCardColors,
} = require("../common/utils");
const { commits } = require("../common/icons");




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


  d


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

const renderAnimalObjectCard = (stats = {}) => {
  const {
    name,
    animal = 4,
    drink = 4,
    theme = "default"
  } = stats;

  // 여기서부터 코드 작성한거
  const magni = 20;
  const selectTheme = theme ? circleThemes[theme] : circleThemes["default"];

  const selectAnimal = () => {
    if (animal == 1) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="20%" y="3%" viewBox="-20 -20 128 128">
      ${animals.sloth}
      </svg>
      `;
    };
    if (animal == 2) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="25%" y="6%" viewBox="-20 -20 128 128">
      ${animals.pig}
      </svg>
      `;
    };
    if (animal == 3) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="25%" y="5%" viewBox="-20 -20 128 128">
      ${animals.dog}
      </svg>
      `;
    };
    if (animal == 4) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="15%" y="-3%" viewBox="-30 -30 128 128">
      ${animals.horse}
      </svg>
      `;
    };
  };
  const selectDrink = () => {
    if (drink == 1) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="-3%" y="2%" viewBox="-20 -20 140 140">
      ${drinks.babyBottle}
      </svg>
      `;
    };
    if (drink == 2) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="6%" y="10%" viewBox="-20 -20 168 168">
      ${drinks.tea}
      </svg>
      `;
    };
    if (drink == 3) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="0%" y="4%" viewBox="-20 -20 140 140">
      ${drinks.coffee}
      </svg>
      `;  
    };
    if (drink == 4) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="2%" y="3%" viewBox="-20 -20 150 150">
      ${drinks.fire}
      </svg>
      `;  
    };
  };

  return `
    
<svg version="1.1"
  width="${magni*10}" height="${magni*11.5}"
  viewBox="0 0 200 230"
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <path d="M 25 100 A 50 50 0 1 1 175 100 " id="usernameCircle"/>
    <path id="ribbonText" d="M36 185.5C48 181 66.5 178 66.5 178C66.5 178 74.5 176 99.5 176C124.5 176 142 178.5 163 185.5"/>
  </defs>
  <style>
    ${selectTheme.describeText}
    ${selectTheme.nameText}
    ${selectTheme.ribbonColor}
    ${selectTheme.starColor}
  </style>
  <g id="badge">
    <g id="circle">
      <circle id="outCircle" cx="100" cy="100" r="100" fill="${selectTheme.outcircleColor}"/>
      <circle id="inCircle" cx="100" cy="100" r="60" fill="${selectTheme.incircleColor}"/>
      <text class="describeText" lengthAdjust="spacingAndGlyphs">
        <textPath xlink:href="#usernameCircle" startOffset="50%" alignment-baseline="middle" text-anchor="middle">Drink Milk Pig</textPath>
      </text>
      <g id="stars">
        <animateTransform 
        attributeName="transform" 
        attributeType="XML" 
        type="rotate"
        dur="5s" 
        from="0 100 100"
        to="-360 100 100" 
        repeatCount="1" />
        <path id="Star 16" d="M64.5 8L65.0613 9.72746H66.8776L65.4082 10.7951L65.9695 12.5225L64.5 11.4549L63.0305 12.5225L63.5918 10.7951L62.1224 9.72746H63.9387L64.5 8Z"/>
        <path id="Star 15" d="M33.5 29L34.0613 30.7275H35.8776L34.4082 31.7951L34.9695 33.5225L33.5 32.4549L32.0305 33.5225L32.5918 31.7951L31.1224 30.7275H32.9387L33.5 29Z"/>
        <path id="Star 14" d="M12.5 59L13.0613 60.7275H14.8776L13.4082 61.7951L13.9695 63.5225L12.5 62.4549L11.0305 63.5225L11.5918 61.7951L10.1224 60.7275H11.9387L12.5 59Z"/>
        <path id="Star 13" d="M4.5 95L5.06129 96.7275H6.87764L5.40818 97.7951L5.96946 99.5225L4.5 98.4549L3.03054 99.5225L3.59182 97.7951L2.12236 96.7275H3.93871L4.5 95Z"/>
        <path id="Star 12" d="M10.5 131L11.0613 132.727H12.8776L11.4082 133.795L11.9695 135.522L10.5 134.455L9.03054 135.522L9.59182 133.795L8.12236 132.727H9.93871L10.5 131Z"/>
        <path id="Star 11" d="M30.5 164L31.0613 165.727H32.8777L31.4082 166.795L31.9695 168.522L30.5 167.455L29.0306 168.522L29.5919 166.795L28.1224 165.727H29.9387L30.5 164Z"/>
        <path id="Star 10" d="M61.5 185L62.0613 186.728H63.8776L62.4082 187.795L62.9695 189.523L61.5 188.455L60.0305 189.523L60.5918 187.795L59.1224 186.728H60.9387L61.5 185Z"/>
        <path id="Star 9" d="M99.5 193L100.061 194.727H101.878L100.408 195.795L100.969 197.523L99.5 196.455L98.0305 197.523L98.5918 195.795L97.1224 194.727H98.9387L99.5 193Z"/>
        <path id="Star 8" d="M138.5 186L139.061 187.728H140.878L139.408 188.795L139.969 190.523L138.5 189.455L137.031 190.523L137.592 188.795L136.122 187.728H137.939L138.5 186Z"/>
        <path id="Star 7" d="M170.5 163L171.061 164.727H172.878L171.408 165.795L171.969 167.523L170.5 166.455L169.031 167.523L169.592 165.795L168.122 164.727H169.939L170.5 163Z"/>
        <path id="Star 6" d="M189.5 131L190.061 132.727H191.878L190.408 133.795L190.969 135.522L189.5 134.455L188.031 135.522L188.592 133.795L187.122 132.727H188.939L189.5 131Z"/>
        <path id="Star 5" d="M195.5 95L196.061 96.7275H197.878L196.408 97.7951L196.969 99.5225L195.5 98.4549L194.031 99.5225L194.592 97.7951L193.122 96.7275H194.939L195.5 95Z"/>
        <path id="Star 4" d="M187.5 59L188.061 60.7275H189.878L188.408 61.7951L188.969 63.5225L187.5 62.4549L186.031 63.5225L186.592 61.7951L185.122 60.7275H186.939L187.5 59Z"/>
        <path id="Star 3" d="M166.5 29L167.061 30.7275H168.878L167.408 31.7951L167.969 33.5225L166.5 32.4549L165.031 33.5225L165.592 31.7951L164.122 30.7275H165.939L166.5 29Z"/>
        <path id="Star 2" d="M135.5 9L136.061 10.7275H137.878L136.408 11.7951L136.969 13.5225L135.5 12.4549L134.031 13.5225L134.592 11.7951L133.122 10.7275H134.939L135.5 9Z"/>
        <path id="Star 1" d="M99.5 2L100.061 3.72746H101.878L100.408 4.79508L100.969 6.52254L99.5 5.45492L98.0305 6.52254L98.5918 4.79508L97.1224 3.72746H98.9387L99.5 2Z"/>
      </g>
    </g>
    ${selectDrink()}
    ${selectAnimal()}
    <g id="ribbon">
      <path id="outline" fill-rule="evenodd" fill-opacity="0.3" clip-rule="evenodd" d="M99.9911 152.108C108.388 151.742 117.798 152.308 128.548 153.804C139.383 155.365 151.025 157.86 164.213 161.284V173.586C171.837 175.747 178.517 177.808 184.527 180.136C190.538 182.464 195.604 184.824 200 187.351C195.158 189.679 190.795 191.973 186.52 193.868C182.312 195.796 178.432 197.691 174.808 199.187C179.874 204.407 184.356 209.561 188.529 214.648C192.719 219.867 196.324 224.754 199.621 229.841C192.204 226.748 185.455 224.055 179.17 221.895C172.936 219.734 169.158 218.637 162.204 216.808C155.232 215.046 147.178 213.317 137.649 211.488V198.455C132.411 197.424 126.761 196.627 120.442 196.061C114.14 195.562 107.495 195.196 100.111 195.097H99.8705C92.5038 195.196 85.8583 195.563 79.5391 196.061C73.2539 196.626 67.5871 197.424 62.333 198.455V211.488C52.8199 213.316 44.7663 215.046 37.7774 216.808C30.8229 218.636 27.1142 219.734 20.8122 221.895C14.5268 224.056 7.847 226.749 0.377279 229.841C3.69143 224.754 7.29797 219.866 11.4708 214.647C15.6606 209.56 20.1597 204.406 25.1738 199.186C21.5677 197.69 17.6874 195.795 13.4627 193.867C9.27272 191.972 4.80807 189.678 -3.05176e-05 187.35C4.39599 184.824 9.46163 182.463 15.4541 180.135C21.4986 177.807 28.1441 175.746 35.7855 173.585V161.283C48.939 157.859 60.6674 155.365 71.4341 153.803C82.2013 152.308 91.6109 151.741 99.9913 152.108H99.9911Z"/>
      <path id="ribbon 5" fill-rule="evenodd" clip-rule="evenodd" d="M196.156 227.349C192.79 225.52 188.636 223.725 183.552 221.83C178.452 219.934 172.94 218.073 165.814 216.111C158.722 214.25 150.668 212.454 141.259 210.591C144.108 210.226 147.32 209.428 151.149 208.198C154.996 206.934 159.186 205.439 163.993 203.344V175.815C167.668 176.845 172.115 178.441 177.525 180.236C182.986 182.064 189.082 184.458 196.276 187.052C190.799 190.045 186.093 192.338 181.956 194.3C177.8 196.228 174.52 197.626 171.721 198.489C175.052 201.681 178.641 205.604 182.746 210.392C186.832 215.214 191.28 220.866 196.156 227.349Z"/>
      <path id="ribbon 4" fill-rule="evenodd" clip-rule="evenodd" d="M160.579 203.115L137.963 210.596V198.959C141.741 199.458 145.399 199.99 149.211 200.688C153.006 201.42 156.75 202.185 160.579 203.115Z"/>
      <path id="ribbon 3" fill-rule="evenodd" clip-rule="evenodd" d="M2.8705 227.349C6.27051 225.52 10.3917 223.725 15.4918 221.83C20.6432 219.934 26.1383 218.073 33.2302 216.111C40.3388 214.25 48.3923 212.454 57.7853 210.591C54.9692 210.226 51.7408 209.428 47.8944 208.198C44.0656 206.934 39.8751 205.439 35.05 203.344V175.815C31.3923 176.845 26.9448 178.441 21.5185 180.236C16.0922 182.064 9.9448 184.458 2.74982 187.052C8.26195 190.045 12.9498 192.338 17.071 194.3C21.2433 196.228 24.5236 197.626 27.3055 198.489C24.0085 201.681 20.4019 205.604 16.2812 210.392C12.2119 215.214 7.76444 220.866 2.8705 227.349Z"/>
      <path id="ribbon 2" fill-rule="evenodd" clip-rule="evenodd" d="M38.4495 203.115L61.0819 210.596V198.959C57.3384 199.458 53.6293 199.99 49.8172 200.688C46.0394 201.42 42.2964 202.185 38.4495 203.115Z"/>
      <path id="ribbon 1" fill-rule="evenodd" clip-rule="evenodd" d="M100.44 152.884C105.746 152.75 111.807 153.05 119.088 153.782C126.421 154.679 136.363 156.042 143.746 157.505C151.114 159.001 157.45 160.498 162.962 162.359V201.093C157.553 199.597 152.092 198.233 146.374 197.136C140.656 196.139 136.689 195.308 128.979 194.51C121.303 193.778 111.996 193.113 100.663 192.515H98.3623C87.0284 193.113 77.7733 193.778 70.0632 194.51C62.4389 195.307 58.4036 196.139 52.6682 197.136C46.9671 198.234 41.5237 199.597 36.0626 201.093V162.359C41.6091 160.498 47.9283 159.001 55.2778 157.505C62.696 156.042 72.6899 154.678 79.9537 153.782C87.2516 153.05 93.3305 152.751 98.5851 152.884H100.44Z"/>
    </g>
    <text class="nameText">
      <textPath xlink:href="#ribbonText" startOffset="50%" alignment-baseline="middle" text-anchor="middle">${name}</textPath>
    </text>
  </g>
</svg>

  `
};

module.exports = renderAnimalObjectCard;
