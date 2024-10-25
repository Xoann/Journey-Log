import React, { createContext, useContext, useState, ReactNode } from "react";

type HeatmapColors = {
  default: string;
  low: string;
  mediumLow: string;
  medium: string;
  mediumHigh: string;
  high: string;
};

interface Theme {
  name: string;
  heatmapColors: HeatmapColors;
}

const limeTheme: Theme = {
  name: "lime",
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-lime-low",
    mediumLow: "bg-lime-mediumLow",
    medium: "bg-lime-medium",
    mediumHigh: "bg-lime-mediumHigh",
    high: "bg-lime-high",
  },
};

const iceTheme: Theme = {
  name: "ice",
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-ice-low",
    mediumLow: "bg-ice-mediumLow",
    medium: "bg-ice-medium",
    mediumHigh: "bg-ice-mediumHigh",
    high: "bg-ice-high",
  },
};

const magentaTheme: Theme = {
  name: "magenta",
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-magenta-low",
    mediumLow: "bg-magenta-mediumLow",
    medium: "bg-magenta-medium",
    mediumHigh: "bg-magenta-mediumHigh",
    high: "bg-magenta-high",
  },
};

const flameTheme: Theme = {
  name: "flame",
  heatmapColors: {
    default: "bg-gray-800",
    low: "bg-flame-low",
    mediumLow: "bg-flame-mediumLow",
    medium: "bg-flame-medium",
    mediumHigh: "bg-flame-mediumHigh",
    high: "bg-flame-high",
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

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<keyof typeof themes>("lime");

  const switchTheme = (themeName: keyof typeof themes) =>
    setThemeName(themeName);

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
