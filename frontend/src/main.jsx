import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import "./i18n";
import i18n from "i18next";
import { getTheme } from "./styles/theme.js";
import { store } from './store'

const direction = i18n.dir();
document.documentElement.dir = direction;

const cache = createCache({
  key: direction === "rtl" ? "muirtl" : "mui",
  stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : []
});

const theme = getTheme(direction);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </Provider>
);