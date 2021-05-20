const I18n = require("../common/I18n");
const Card = require("../common/card");
const icons = require("../common/icons");
const renderAnimalCard = require("./animal-card");
const { getStyles } = require("../getStyles");
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

const renderStatsCard = (data = {}, options = { hide: [] }) => {
  const {
    name,
    step,
    distance,
    active_minutes,
    heart_level,
    heart_minutes,
    sleep,
    animal,
  } = data;
  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    hide_badge = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    badge_theme = "default",
    custom_title,
    border_radius,
    border_color,
    locale,
    disable_animations = false,
  } = options;

  const lheight = parseInt(line_height, 10);

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

  const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      createTextNode({
        ...STATS[key],
        index,
        showIcons: show_icons,
        shiftValuePos:
          (isLongLocale ? 50 : 0),
      }),
    );

  let height = Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_badge ? 0 : 150,
  );

  size = (height-145)/100 + 1
  
  var badgeStats = {
    name: name,
    animal: animal,
    theme: badge_theme,
    size: size,
  };

  const badgeCircle = hide_badge
    ? ""
    : `
      <g data-testid="rank-circle" 
      transform="translate(280, -30)">
      ${renderAnimalCard(badgeStats)}
      </g>`

  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
  });

  const calculateTextWidth = () => {
    return measureText(custom_title ? custom_title : `${name}'s Health Stats`);
  };

  const width = hide_badge
    ? clampValue(
        50 /* padding */ + calculateTextWidth() * 2,
        270 /* min */,
        Infinity,
      )
    : 495;

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: `${name}'s 7days Health Stats`,
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
    ${badgeCircle}

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
