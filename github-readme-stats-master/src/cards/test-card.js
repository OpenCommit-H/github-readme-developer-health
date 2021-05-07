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

const renderStatsCard = (stats = {}, options = { hide: [] }) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    contributedTo,
    day7commits,
    rank,
  } = stats;
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
    animal = 1,
    drink = 1,
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
    stars: {
      icon: icons.star,
      label: i18n.t("statcard.totalstars"),
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: icons.commits,
      label: `${i18n.t("statcard.commits")}${
        include_all_commits ? "" : ` (${new Date().getFullYear()})`
      }`,
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: icons.prs,
      label: i18n.t("statcard.prs"),
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: icons.issues,
      label: i18n.t("statcard.issues"),
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: icons.contribs,
      label: i18n.t("statcard.contribs"),
      value: contributedTo,
      id: "contribs",
    },
    day7commit: {
      icon: icons.commits,
      label: i18n.t("statcard.day7commit"),
      value: day7commits,
      id: "day7commits",
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

  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `<g data-testid="rank-circle" 
          transform="translate(400, ${height / 2 - 50})">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">
          <text
            x="${rank.level.length === 1 ? "-4" : "0"}"
            y="0"
            alignment-baseline="central"
            dominant-baseline="central"
            text-anchor="middle"
          >
            ${rank.level}
          </text>
        </g>
      </g>`;

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
    return measureText(custom_title ? custom_title : i18n.t("statcard.title"));
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
    defaultTitle: i18n.t("statcard.title"),
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
  // 여기서부터 코드 작성한거
  const magni = 20;

  const selectAnimal = () => {
    if (animal == 1) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="15%" y="15%" viewBox="${-magni} ${-magni} ${72+2*magni} ${72+2*magni}">
      ${animals.sloth}
      </svg>
      `;
    };
    if (animal == 2) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="15%" y="15%" viewBox="${-magni} ${-magni} ${72+2*magni} ${72+2*magni}">
      ${animals.pig}
      </svg>
      `;
    };
    if (animal == 3) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" x="15%" y="15%" viewBox="${-magni} ${-magni} ${72+2*magni} ${72+2*magni}">
      ${animals.pig}
      </svg>
      `;
    };
  };
  const selectDrink = () => {
    if (drink == 1) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" viewBox="${-magni} ${-magni} ${72+2*magni} ${72+2*magni}">
      ${drinks.babyBottle}
      </svg>
      `;
    };
    if (drink == 2) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" viewBox="${-magni} ${-magni} ${72+2*magni} ${72+2*magni}">
      ${drinks.tea}
      </svg>
      `;
    };
    if (drink == 3) {
      return `
      <svg preserveAspectRatio="xMidYMid meet" viewBox="${-magni} ${-magni} ${72+2*magni} ${72+2*magni}">
      ${drinks.tea}
      </svg>
      `;
    };
  };

  return `
    <svg version="1.1"
     baseProfile="full"
     width="${magni*10}" height="${magni*10}"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
     <defs>
      <path d="M15,100a85,85 0 1,0 170,0a85,85 0 1,0 -170,0" id="coffeecircle" />
      <path d="M100,37c34.8,0,63,28.2,63,63s-28.2,63-63,63s-63-28.2-63-63S65.2,37,100,37z" id="starbuckscircle" transform="rotate(-30 100 100)" />
    </defs>
  <svg>
    <rect width="100%" height="100%" fill="white" />
    

    <svg preserveAspectRatio="xMidYMid meet" viewBox="-12 -12 224 224" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Group 2">
    <circle id="Ellipse 5" cx="106" cy="106" r="100" fill="#1E3945"/>
    <g id="Ellipse 6" style="mix-blend-mode:multiply" filter="url(#filter0_f)">
    </g>
    <g id="Ellipse 8" filter="url(#filter1_f)">
    </g>
    <g>
    <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="5s" 
         from="0 106 106"
         to="-360 106 106" 
         repeatCount="1" />
    <path id="Star 17" d="M10.5 101L11.0613 102.727H12.8776L11.4082 103.795L11.9695 105.523L10.5 104.455L9.03054 105.523L9.59182 103.795L8.12236 102.727H9.93871L10.5 101Z" fill="white"/>
    <path id="Star 18" d="M39.5 35L40.0613 36.7275H41.8776L40.4082 37.7951L40.9695 39.5225L39.5 38.4549L38.0305 39.5225L38.5918 37.7951L37.1224 36.7275H38.9387L39.5 35Z" fill="white"/>
    <path id="Star 19" d="M70.5 14L71.0613 15.7275H72.8776L71.4082 16.7951L71.9695 18.5225L70.5 17.4549L69.0305 18.5225L69.5918 16.7951L68.1224 15.7275H69.9387L70.5 14Z" fill="white"/>
    <path id="Star 20" d="M105.5 8L106.061 9.72746H107.878L106.408 10.7951L106.969 12.5225L105.5 11.4549L104.031 12.5225L104.592 10.7951L103.122 9.72746H104.939L105.5 8Z" fill="white"/>
    <path id="Star 21" d="M141.5 15L142.061 16.7275H143.878L142.408 17.7951L142.969 19.5225L141.5 18.4549L140.031 19.5225L140.592 17.7951L139.122 16.7275H140.939L141.5 15Z" fill="white"/>
    <path id="Star 22" d="M172.5 35L173.061 36.7275H174.878L173.408 37.7951L173.969 39.5225L172.5 38.4549L171.031 39.5225L171.592 37.7951L170.122 36.7275H171.939L172.5 35Z" fill="white"/>
    <path id="Star 23" d="M193.5 65L194.061 66.7275H195.878L194.408 67.7951L194.969 69.5225L193.5 68.4549L192.031 69.5225L192.592 67.7951L191.122 66.7275H192.939L193.5 65Z" fill="white"/>
    <path id="Star 24" d="M201.5 101L202.061 102.727H203.878L202.408 103.795L202.969 105.523L201.5 104.455L200.031 105.523L200.592 103.795L199.122 102.727H200.939L201.5 101Z" fill="white"/>
    <path id="Star 25" d="M195.5 137L196.061 138.727H197.878L196.408 139.795L196.969 141.523L195.5 140.455L194.031 141.523L194.592 139.795L193.122 138.727H194.939L195.5 137Z" fill="white"/>
    <path id="Star 26" d="M176.5 169L177.061 170.727H178.878L177.408 171.795L177.969 173.523L176.5 172.455L175.031 173.523L175.592 171.795L174.122 170.727H175.939L176.5 169Z" fill="white"/>
    <path id="Star 27" d="M144.5 192L145.061 193.727H146.878L145.408 194.795L145.969 196.523L144.5 195.455L143.031 196.523L143.592 194.795L142.122 193.727H143.939L144.5 192Z" fill="white"/>
    <path id="Star 28" d="M105.5 199L106.061 200.727H107.878L106.408 201.795L106.969 203.523L105.5 202.455L104.031 203.523L104.592 201.795L103.122 200.727H104.939L105.5 199Z" fill="white"/>
    <path id="Star 29" d="M67.5 191L68.0613 192.727H69.8776L68.4082 193.795L68.9695 195.523L67.5 194.455L66.0305 195.523L66.5918 193.795L65.1224 192.727H66.9387L67.5 191Z" fill="white"/>
    <path id="Star 30" d="M36.5 170L37.0613 171.727H38.8776L37.4082 172.795L37.9695 174.523L36.5 173.455L35.0305 174.523L35.5918 172.795L34.1224 171.727H35.9387L36.5 170Z" fill="white"/>
    <path id="Star 31" d="M16.5 137L17.0613 138.727H18.8776L17.4082 139.795L17.9695 141.523L16.5 140.455L15.0305 141.523L15.5918 139.795L14.1224 138.727H15.9387L16.5 137Z" fill="white"/>
    <path id="Star 32" d="M18.5 65L19.0613 66.7275H20.8776L19.4082 67.7951L19.9695 69.5225L18.5 68.4549L17.0305 69.5225L17.5918 67.7951L16.1224 66.7275H17.9387L18.5 65Z" fill="white"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_f" x="0" y="0" width="212" height="212" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
    </filter>
    <filter id="filter1_f" x="41" y="37" width="128" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
    </filter>
    </defs>
    </svg>

  </svg>
  
  <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
  <text>
    <textPath xlink:href="#starbuckscircle" fill="white">${name}</textPath>
</text>
  <text x="50%" y="10%" font-size="15" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" fill="white">drink milk dog</text>
  <text x="82.5%" y="20%" font-size="10" alignment-baseline="central" dominant-baseline="central" text-anchor="end" fill="white">${day7commits} C/W</text>

    </svg>
  
  ${selectDrink()}
  ${selectAnimal()}
</svg>
  `
};

module.exports = renderStatsCard;
