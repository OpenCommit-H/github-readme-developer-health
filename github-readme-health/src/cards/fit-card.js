const I18n = require("../common/I18n");
const Card = require("../common/Card");
const icons = require("../common/icons");
const renderTestCard = require("./animal-object-card");
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

const renderStatsCard = (abc = {}, options = { hide: [] }) => {
  const {
    name,
    step,
    distance,
    heart_rate_avg,
    heart_rate_max,
    heart_rate_min,
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
    heart_rate_avg: {
      icon: icons.heart_rate_avg,
      label: "heart_rate_avg",
      value: heart_rate_avg,
      id: "heart_rate_avg",
    },
    heart_rate_max: {
      icon: icons.heart_rate_max,
      label: "heart_rate_max",
      value: heart_rate_max,
      id: "heart_rate_max",
    },
    heart_rate_min: {
      icon: icons.heart_rate_min,
      label: "heart_rate_min",
      value: heart_rate_min,
      id: "heart_rate_min",
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
      name: "aaaaaaa",
      animal: 4,
      drink: 4,
      theme: "default"
    };
  // Conditionally rendered elements
  const rankCircle = hide_rank
    ? ""
    : `
    <g data-testid="rank-circle" 
          transform="translate(270, 0)">
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

  return card.render(`
    ${rankCircle}

    <svg x="0" y="0">
      ${FlexLayout({
        items: statItems,
        gap: lheight,
        direction: "column",
      }).join("")}
    </svg> 
  `);
};

module.exports = renderStatsCard;
