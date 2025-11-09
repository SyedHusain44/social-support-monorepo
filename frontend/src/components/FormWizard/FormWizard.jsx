import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Alert, Grid } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ProgressBar from './ProgressBar';
import Step1Personal from './Step1Personal';
import Step2Family from './Step2Family';
import Step3Situation from './Step3Situation';
import { saveFormData, loadFormData, clearFormData } from '../../services/storageService';
import { useDispatch } from "react-redux";
import { clearActiveFormData } from '../../features/aiAdvices/aiAdvicesSlice'

const FormWizard = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const dispatch = useDispatch();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: loadFormData() || {
      // Step 1
      name: '',
      nationalId: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: '',
      // Step 2
      maritalStatus: '',
      dependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',
      // Step 3
      financialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    },
  });

  const { handleSubmit, watch, trigger } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const stepPaths = ['/', '/family-info', '/situation'];

  useEffect(() => {
    const subscription = watch((value) => {
      saveFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const idx = stepPaths.indexOf(location.pathname);
    if (idx !== -1 && idx !== activeStep) {
      setActiveStep(idx);
    } else if (idx === -1) {
      navigate(stepPaths[0], { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const steps = [
    <Step1Personal key="step1" />,
    <Step2Family key="step2" />,
    <Step3Situation key="step3" />,
  ];

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(activeStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      const next = activeStep + 1;
      if (next < stepPaths.length) {
        navigate(stepPaths[next]);
      }
    }
  };

  const handleBack = () => {
    const prev = activeStep - 1;
    if (prev >= 0) navigate(stepPaths[prev]);
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'];
      case 1:
        return ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'];
      case 2:
        return ['financialSituation', 'employmentCircumstances', 'reasonForApplying'];
      default:
        return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const refNumber = 'SSA-' + Date.now().toString(36).toUpperCase();
      setReferenceNumber(refNumber);
      setSubmitted(true);

      console.log(data)

      clearFormData();
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('error.submit'));
    }
  };

  const handleNewApplication = () => {
    dispatch(clearActiveFormData());
    methods.reset();
    setActiveStep(0);
    setSubmitted(false);
    setReferenceNumber('');
    clearFormData();
    navigate(stepPaths[0]);
  };

  if (submitted) {
    return (
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="success.main" gutterBottom>
            {t('success.title')}
          </Typography>
          <Typography variant="body1" sx={{ my: 3 }}>
            {t('success.message')}
          </Typography>
          <Alert severity="info" sx={{ my: 2 }}>
            <Typography variant="body2">
              <strong>{t('success.reference')}:</strong> {referenceNumber}
            </Typography>
          </Alert>
          <Button
            variant="contained"
            onClick={handleNewApplication}
            sx={{ mt: 2 }}
          >
            {t('success.newApplication')}
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 1 }}>
        {t('app.title')}
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        {t('app.subtitle')}
      </Typography>

      <Grid container spacing={2} sx={{
        mt: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}>
        <Grid item xs={12}
          md={8}     // 
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 70%' },
          }}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
            <ProgressBar activeStep={activeStep} />

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ minHeight: 400 }}>
                  {steps[activeStep]}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    {t('nav.back')}
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button type="submit" variant="contained" color="primary">
                      {t('nav.submit')}
                    </Button>
                  ) : (
                    <Button onClick={handleNext} variant="contained" color="primary">
                      {t('nav.next')}
                    </Button>
                  )}
                </Box>
              </form>
            </FormProvider>
          </Paper>
        </Grid>

        <Grid item xs={12}
          md={4}
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 25%' },
          }}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {t('tips.title', 'Tips & Questions')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('tips.subtitle', 'Quick tips to help you fill this step')}
            </Typography>

            {/* Tips list pulled from translations as an array */}
            {(() => {
              const stepKey = `tips.step${activeStep + 1}`;
              const items = t(stepKey, { returnObjects: true });
              if (Array.isArray(items) && items.length) {
                return (
                  <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                    {items.map((it, idx) => (
                      <li key={idx} style={{ marginBottom: 6 }}>
                        <Typography variant="body2">{it}</Typography>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                  <li><Typography variant="body2">{t('tips.default1')}</Typography></li>
                  <li><Typography variant="body2">{t('tips.default2')}</Typography></li>
                  <li><Typography variant="body2">{t('tips.default3')}</Typography></li>
                </ul>
              );
            })()}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormWizard;
