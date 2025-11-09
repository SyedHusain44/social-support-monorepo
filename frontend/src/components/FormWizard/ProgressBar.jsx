import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ProgressBar = ({ activeStep }) => {
  const { t, i18n } = useTranslation();

  const steps = [
    t('progress.personal'),
    t('progress.family'),
    t('progress.situation'),
  ];

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '& .MuiStepLabel-root': {
            flexDirection: i18n.language === 'ar' ? 'row-reverse' : 'row',
          },
          '& .MuiStepConnector-line': {
            transform: i18n.language === 'ar' ? 'scaleX(-1)' : 'none'
          }
        }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressBar;
