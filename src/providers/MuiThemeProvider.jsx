'use client';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

function MuiThemeProvider({ children }) {
  const resolvedTailwindConfig = useMemo(() => resolveConfig(tailwindConfig), []);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          main: resolvedTailwindConfig.theme.colors.primary['500'],
        },
        secondary: {
          main: resolvedTailwindConfig.theme.colors.secondary['50'],
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            variant: 'contained',
            size: 'large',
          },
          styleOverrides: {
            root: {
              textTransform: 'unset',
              borderRadius: '8px',
              padding: '5px 20px',
            },
            outlinedSecondary: {
              color: resolvedTailwindConfig.theme.colors.body,
              borderColor: resolvedTailwindConfig.theme.colors.primary['200'],
            },
            containedSuccess: {
              backgroundColor: resolvedTailwindConfig.theme.colors['success'],
            },
          },
          variants: [
            {
              props: { variant: 'unstyled' },
              style: {
                all: 'unset',
              },
            },
            {
              props: { customshape: 'rounded' },
              style: {
                borderRadius: '9999px',
              },
            },
            {
              props: { customtext: 'primary' },
              style: {
                color: resolvedTailwindConfig.theme.colors.primary['500'],
              },
            },
          ],
        },
        MuiStack: {
          defaultProps: {
            direction: 'row',
            gap: 1,
          },
        },
        MuiMenu: {
          defaultProps: {
            transitionDuration: 300,
          },
        },
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
          },
        },
        MuiAutocomplete: {
          styleOverrides: {
            root: {
              '.MuiOutlinedInput-root': {
                fontSize: 14,
                padding: 0,
                borderRadius: '8px !important',
                color: resolvedTailwindConfig.theme.colors.body,
                '& fieldset': {
                  borderColor: resolvedTailwindConfig.theme.colors.primary['200'],
                },
                '&:hover fieldset': {
                  borderColor: resolvedTailwindConfig.theme.colors.primary['200'],
                },
                '&.Mui-error fieldset': {
                  borderColor: 'red',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: '0.5px !important',
                  borderColor: `${resolvedTailwindConfig.theme.colors.primary['300']} !important`,
                },
              },
              '.MuiAutocomplete-input': {
                padding: '12px !important',
              },
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            root: {
              zIndex: 9999,
            },
          },
        },
      },
    });
  }, [resolvedTailwindConfig.theme.colors]);

  return (
    <ThemeProvider theme={theme} key="mui-theme">
      <CssBaseline enableColorScheme key="mui-css-baseline" />
      {children}
    </ThemeProvider>
  );
}

export default MuiThemeProvider;
