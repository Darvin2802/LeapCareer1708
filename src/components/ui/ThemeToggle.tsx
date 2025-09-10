import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme, Theme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark' },
    { value: 'auto', icon: <Monitor className="h-4 w-4" />, label: 'Auto' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              theme === themeOption.value
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {theme === themeOption.value && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md shadow-sm"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative flex items-center space-x-1">
              {themeOption.icon}
              <span className="hidden sm:inline">{themeOption.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;