import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc143c',
      light: '#ff3a62',
      dark: '#8b0000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    error: {
      main: '#ff3a62',
    },
    success: {
      main: '#22c55e',
    },
    warning: {
      main: '#f59e0b',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#1e293b',
    },
    h4: {
      fontWeight: 700,
      color: '#1e293b',
    },
    h5: {
      fontWeight: 700,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#1e293b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          backgroundColor: '#dc143c',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#8b0000',
          },
        },
        outlined: {
          borderColor: '#dc143c',
          color: '#dc143c',
          '&:hover': {
            borderColor: '#8b0000',
            color: '#8b0000',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          color: '#dc143c',
          '&:hover': {
            backgroundColor: 'rgba(220, 20, 60, 0.08)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(220, 20, 60, 0.08)',
            color: '#dc143c',
            '&:hover': {
              backgroundColor: 'rgba(220, 20, 60, 0.12)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(220, 20, 60, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: '#dc143c',
          color: '#dc143c',
          '&:hover': {
            backgroundColor: 'rgba(220, 20, 60, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#dc143c',
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& thead': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
  },
});

export default theme;
