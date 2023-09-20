const STORAGE_KEYS = {
  THEME: "theme",
};

const THEME_KEYS = {
  SYSTEM: "system",
  DARK: "dark",
  LIGHT: "light",
};

const themeMediaQuery = window.matchMedia(
  `(prefers-color-scheme: ${THEME_KEYS.DARK})`
);

const setTheme = () => {
  let selectedTheme;
  const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);

  switch (storedTheme) {
    case THEME_KEYS.SYSTEM:
      const prefersDarkForSystem = themeMediaQuery.matches;
      selectedTheme = prefersDarkForSystem ? THEME_KEYS.DARK : THEME_KEYS.LIGHT;
      break;
    case null:
    case undefined:
      const prefersDarkDefault = themeMediaQuery.matches;
      selectedTheme = prefersDarkDefault ? THEME_KEYS.DARK : THEME_KEYS.LIGHT;
      localStorage.setItem(STORAGE_KEYS.THEME, THEME_KEYS.SYSTEM);
      break;
    default:
      selectedTheme = storedTheme;
      break;
  }

  document.documentElement.setAttribute("data-theme", selectedTheme);
};

// Initial theme setup
setTheme();

// Detect system theme changes
themeMediaQuery.addEventListener("change", () => {
  if (localStorage.getItem(STORAGE_KEYS.THEME) === THEME_KEYS.SYSTEM) {
    setTheme();
  }
});

// Custom theme change
const themeChange = (selectedTheme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, selectedTheme);
  setTheme();
};