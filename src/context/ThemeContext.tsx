import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  use,
  useEffect,
} from "react";
import tailwindConfig from "../../tailwind.config";

export enum Shade {
  Default = "default",
  Low = "low",
  MediumLow = "mediumLow",
  Medium = "medium",
  MediumHigh = "mediumHigh",
  High = "high",
}

type gradientColors = {
  default: string;
  low: string;
  mediumLow: string;
  medium: string;
  mediumHigh: string;
  high: string;
};

type Colors = {
  text: string;
  background: string;
  button: string;
  primary: string;
};

interface Theme {
  name: string;
  colors: Colors;
  highlightedTextColors: gradientColors;
  heatmapColors: gradientColors;
  getShade: (shade: Shade) => string;
}

const limeTheme: Theme = {
  name: "lime",
  colors: {
    text: "text-text",
    background: "bg-background",
    button: "bg-gray-700",
    primary: "lime-medium",
  },
  highlightedTextColors: {
    default: "text-text",
    low: "text-lime-low",
    mediumLow: "text-lime-mediumLow",
    medium: "text-lime-medium",
    mediumHigh: "text-lime-mediumHigh",
    high: "text-lime-high",
  },
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-lime-low",
    mediumLow: "bg-lime-mediumLow",
    medium: "bg-lime-medium",
    mediumHigh: "bg-lime-mediumHigh",
    high: "bg-lime-high",
  },
  getShade: (shade: Shade) => {
    const shades = (tailwindConfig?.theme?.extend?.colors as any)?.lime;
    switch (shade) {
      case Shade.Low:
        return shades.low;
      case Shade.MediumLow:
        return shades.mediumLow;
      case Shade.Medium:
        return shades.medium;
      case Shade.MediumHigh:
        return shades.mediumHigh;
      case Shade.High:
        return shades.high;
      default:
        return shades.default;
    }
  },
};

const iceTheme: Theme = {
  name: "ice",
  colors: {
    text: "text-text",
    background: "bg-background",
    button: "bg-gray-700",
    primary: "ice-medium",
  },
  highlightedTextColors: {
    default: "text-text",
    low: "text-ice-low",
    mediumLow: "text-ice-mediumLow",
    medium: "text-ice-medium",
    mediumHigh: "text-ice-mediumHigh",
    high: "text-ice-high",
  },
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-ice-low",
    mediumLow: "bg-ice-mediumLow",
    medium: "bg-ice-medium",
    mediumHigh: "bg-ice-mediumHigh",
    high: "bg-ice-high",
  },
  getShade: (shade: Shade) => {
    const shades = (tailwindConfig?.theme?.extend?.colors as any)?.ice;
    switch (shade) {
      case Shade.Low:
        return shades.low;
      case Shade.MediumLow:
        return shades.mediumLow;
      case Shade.Medium:
        return shades.medium;
      case Shade.MediumHigh:
        return shades.mediumHigh;
      case Shade.High:
        return shades.high;
      default:
        return shades.default;
    }
  },
};

const magentaTheme: Theme = {
  name: "magenta",
  colors: {
    text: "text-text",
    background: "bg-background",
    button: "bg-gray-700",
    primary: "magenta-medium",
  },
  highlightedTextColors: {
    default: "text-text",
    low: "text-magenta-low",
    mediumLow: "text-magenta-mediumLow",
    medium: "text-magenta-medium",
    mediumHigh: "text-magenta-mediumHigh",
    high: "text-magenta-high",
  },
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-magenta-low",
    mediumLow: "bg-magenta-mediumLow",
    medium: "bg-magenta-medium",
    mediumHigh: "bg-magenta-mediumHigh",
    high: "bg-magenta-high",
  },
  getShade: (shade: Shade) => {
    const shades = (tailwindConfig?.theme?.extend?.colors as any)?.magenta;
    switch (shade) {
      case Shade.Low:
        return shades.low;
      case Shade.MediumLow:
        return shades.mediumLow;
      case Shade.Medium:
        return shades.medium;
      case Shade.MediumHigh:
        return shades.mediumHigh;
      case Shade.High:
        return shades.high;
      default:
        return shades.default;
    }
  },
};

const flameTheme: Theme = {
  name: "flame",
  colors: {
    text: "text-text",
    background: "bg-background",
    button: "bg-gray-700",
    primary: "flame-medium",
  },
  highlightedTextColors: {
    default: "text-text",
    low: "text-flame-low",
    mediumLow: "text-flame-mediumLow",
    medium: "text-flame-medium",
    mediumHigh: "text-flame-mediumHigh",
    high: "text-flame-high",
  },
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-flame-low",
    mediumLow: "bg-flame-mediumLow",
    medium: "bg-flame-medium",
    mediumHigh: "bg-flame-mediumHigh",
    high: "bg-flame-high",
  },
  getShade: (shade: Shade) => {
    const shades = (tailwindConfig?.theme?.extend?.colors as any)?.flame;
    switch (shade) {
      case Shade.Low:
        return shades.low;
      case Shade.MediumLow:
        return shades.mediumLow;
      case Shade.Medium:
        return shades.medium;
      case Shade.MediumHigh:
        return shades.mediumHigh;
      case Shade.High:
        return shades.high;
      default:
        return shades.default;
    }
  },
};

const themes = {
  lime: limeTheme,
  ice: iceTheme,
  magenta: magentaTheme,
  flame: flameTheme,
};

export type ThemeType = "lime" | "ice" | "magenta" | "flame";

interface ThemeContextProps {
  currentTheme: Theme;
  switchTheme: (themeName: ThemeType) => void;
  availableThemes: Array<ThemeType>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const THEME_KEY = "theme";
const DEFAULT_THEME = "lime";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] =
    useState<keyof typeof themes>(DEFAULT_THEME);

  const switchTheme = (themeName: keyof typeof themes) => {
    localStorage.setItem(THEME_KEY, themeName);
    setThemeName(themeName);
  };

  useEffect(() => {
    const storedTheme =
      (localStorage.getItem(THEME_KEY) as keyof typeof themes) || DEFAULT_THEME;
    setThemeName(storedTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themes[themeName],
        switchTheme,
        availableThemes: Object.keys(themes) as Array<keyof typeof themes>,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
