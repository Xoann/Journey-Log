import { ThemeType, useTheme } from "@/context/ThemeContext";
import { useState } from "react";

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeName: string) => {
    switchTheme(themeName as ThemeType); // as keyof typeof availableThemes);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block text-left mt-5">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentTheme.name.charAt(0).toUpperCase() +
            currentTheme.name.slice(1)}{" "}
          Theme
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {availableThemes.map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeSelect(theme)}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  theme === currentTheme.name
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                role="menuitem"
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;