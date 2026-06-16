import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import '../app/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'washi',
      values: [
        { name: 'washi', value: '#F1ECE1' },
        { name: 'white', value: '#FAF7F0' },
        { name: 'dark', value: '#2A2521' },
      ],
    },
  },
};
export default preview;