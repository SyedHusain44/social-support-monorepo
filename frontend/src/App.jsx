import { useState, useEffect } from 'react';
import { Container, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getTheme } from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import RTL from './components/RTL';
import CssBaseline from '@mui/material/CssBaseline';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import FormWizard from './components/FormWizard/FormWizard';

export default function App() {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState(i18n.language === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    setDirection(dir);
    document.dir = dir;
  }, [i18n.language]);

  return (
    <ThemeProvider theme={getTheme(direction)}>
      <RTL direction={direction}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            direction: direction,
          }}
        >
          <Container maxWidth={false} sx={{
            py: 4,
            maxWidth: '90% !important'
          }}>
            <LanguageSwitcher />
            <FormWizard />
          </Container>
        </Box>
      </RTL>
    </ThemeProvider>
  );
}