import { THEMESTORAGEID } from "../controllers/preferences_saver_controller"

const from1to2 = (theme):ThemeVersion2 => {
  return {
    version: 2, selectedValues: theme.map((field) => {
      const resultMapping: HTMLElement = document.querySelector(`[data-value='${field["value"]}']`)
      return { id: field.id, emoji: field["value"], displayText: resultMapping.innerText.trim() }
    })
  }
}

const saveConvertedTheme = (theme: unknown): void => {
  window.localStorage.setItem(THEMESTORAGEID, JSON.stringify(theme));
}

export const migrateTheme = (theme) => {
  let version = theme["version"] || 1;

  switch (version) {
    case 1:
      const convertedTheme = from1to2(theme);
      saveConvertedTheme(convertedTheme);
      return convertedTheme
      break;

    default:
      return theme;
      break;
  }
}
