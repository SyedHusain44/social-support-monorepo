import { createTheme } from "@mui/material/styles";

export const getTheme = (direction) =>
    createTheme({
        direction,
        typography: {
            fontFamily:
                direction === "rtl"
                    ? '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif'
                    : '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        direction
                    }
                }
            }
        }
    });
