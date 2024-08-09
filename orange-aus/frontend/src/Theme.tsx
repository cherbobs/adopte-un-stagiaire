import { createContext, useContext, useState, ReactNode } from "react";
import { PaletteOptions, ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const lightPalette: PaletteOptions = {
  primary: {
    light: "#fee0f8",
    main: "#fd941f",
    dark: "#7800ac",
  },
  secondary: {
    light: "#e2fbf6",
    main: "#81EFD8",
    dark: "#0c805d",
  },
  background: {
    default: "white",
    paper: "white",
  },
};

const darkPalette: PaletteOptions = {
  primary: {
    light: "#9e7bb5",
    main: "#fff",
    dark: "#3f1dcb",
  },
  secondary: {
    light: "#b3e5fc",
    main: "#03a9f4",
    dark: "#0288d1",
  },
  background: {
    default: "#121212",
    paper: "#1d1d1d",
  },
};

const lightTheme = createTheme({
  palette: lightPalette,
});

const darkTheme = createTheme({
  palette: darkPalette,
});

const ThemeToggleContext = createContext({
  toggleTheme: () => {},
  isDarkMode: false,
});

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}

export function AppTheme({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
