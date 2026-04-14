/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        footerGradient:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        textHighlighter: " rgba(6,55,158,1)",
        textWhite: "#ffffff",
        textBlack: "#000000",
      }
    : {
        footerGradient:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        textHighlighter: " rgba(6,55,158,1)",
        textWhite: "#ffffff",
        textBlack: "#000000",
      }),
});

//mui Theme Settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      primary: {
        main: "#E1E1E1", // Cool Gray
      },
      // blue cool //
      secondary: {
        main: "#3244e6",
      },
      tertiary: {
        main: "#2c3ce3",
      },
      background: {
        default: "#f7fff7", // white
      },
      text: {
        primary: "#000", // White
      },
      whitetext: {
        white: "#fff",
      },

      // new add some black this
      bg: {
        black: "#000",
        white: "#fff",
      },
    },

    typography: {
      allVariants: {
        fontFamily: "'Verdana', sans-serif",
        textTransform: "none",
      },
      fontSize: 12,
      h1: {
        lineHeight: "4rem",
        fontSize: "3rem",
        fontWeight: "550",
      },
      h2: {
        fontSize: 32,
        fontWeight: "550",
        lineHeight: "4rem",
      },
      h3: {
        fontWeight: "400",
        fontSize: "1.1rem",
        lineHeight: "3rem",
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 16,
      },
      h6: {
        fontSize: 14,
      },
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "white !important", // Custom error message color
          },
        },
      },
    },
  };
};

//Context for Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
