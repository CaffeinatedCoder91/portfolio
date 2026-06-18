'use client';

// Required for localStorage, documentElement class toggling, and click state.
import { useEffect, useRef, useState } from 'react';
import { ToggleButton } from './ThemeToggle.styles';

type Theme = 'light' | 'dark';

const applyTheme = (newTheme: Theme) => {
  const html = document.documentElement;
  if (newTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  window.localStorage?.setItem('theme', newTheme);
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage?.getItem('theme');
  return stored === 'dark' ? 'dark' : 'light';
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const initialTheme = getInitialTheme();
      setTheme(initialTheme);
      applyTheme(initialTheme);
      initialized.current = true;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const icon = theme === 'light' ? '☀' : '☽';

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {icon}
    </ToggleButton>
  );
};

export default ThemeToggle;
