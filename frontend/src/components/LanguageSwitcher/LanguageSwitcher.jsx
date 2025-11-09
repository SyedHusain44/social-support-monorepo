import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
      document.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={handleLanguageChange}
        aria-label="language selection"
        size="small"
      >
        <ToggleButton value="en" aria-label="English">
          <LanguageIcon sx={{ mr: 0.5 }} />
          English
        </ToggleButton>
        <ToggleButton value="ar" aria-label="Arabic">
          <LanguageIcon sx={{ mr: 0.5 }} />
          العربية
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;
