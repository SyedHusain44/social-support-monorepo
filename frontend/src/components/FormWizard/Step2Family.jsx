import { useEffect } from 'react';
import { Grid, TextField, MenuItem, Typography, Box } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Step2Family = () => {
  const { t, i18n } = useTranslation();
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  const employmentStatus = watch("employmentStatus");
  useEffect(() => {
    if (employmentStatus === "unemployed") {
      setValue("monthlyIncome", "0");
    }
  }, [employmentStatus, setValue]);

  useEffect(() => {
    if (employmentStatus === "unemployed") {
      setValue("monthlyIncome", "0");
    }
  }, [employmentStatus, setValue]);
  return (
    <Box sx={{ direction: i18n.dir() }}>
      <Typography variant="h6" gutterBottom>
        {t('step2.title')}
      </Typography>

      <Grid container className='step-grid'>
        <Grid item className='step-grid-item'>
          <Controller
            name="maritalStatus"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step2.maritalStatus')}
                error={!!errors.maritalStatus}
                helperText={errors.maritalStatus?.message}
                required
                inputProps={{ 'aria-label': t('step2.maritalStatus') }}
              >
                <MenuItem value="single">{t('step2.single')}</MenuItem>
                <MenuItem value="married">{t('step2.married')}</MenuItem>
                <MenuItem value="divorced">{t('step2.divorced')}</MenuItem>
                <MenuItem value="widowed">{t('step2.widowed')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item className='step-grid-item'>
          <Controller
            name="dependents"
            control={control}
            rules={{
              required: t('validation.required'),
              min: { value: 0, message: t('validation.numeric') }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label={t('step2.dependents')}
                error={!!errors.dependents}
                helperText={errors.dependents?.message}
                required
                inputProps={{ 'aria-label': t('step2.dependents'), min: 0 }}
              />
            )}
          />
        </Grid>

        <Grid item className='step-grid-item'>
          <Controller
            name="employmentStatus"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step2.employmentStatus')}
                error={!!errors.employmentStatus}
                helperText={errors.employmentStatus?.message}
                required
                inputProps={{ 'aria-label': t('step2.employmentStatus') }}
              >
                <MenuItem value="employed">{t('step2.employed')}</MenuItem>
                <MenuItem value="unemployed">{t('step2.unemployed')}</MenuItem>
                <MenuItem value="selfEmployed">{t('step2.selfEmployed')}</MenuItem>
                <MenuItem value="retired">{t('step2.retired')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Employment details shown only when employed or self-employed */}
        {employmentStatus === 'employed' && (
          <>
            <Grid item className='step-grid-item'>
              <Controller
                name="employerName"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('step2.employerName')}
                    error={!!errors.employerName}
                    helperText={errors.employerName?.message}
                    inputProps={{ 'aria-label': t('step2.employerName') }}
                  />
                )}
              />
            </Grid>

            <Grid item className='step-grid-item'>
              <Controller
                name="jobTitle"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('step2.jobTitle')}
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                    inputProps={{ 'aria-label': t('step2.jobTitle') }}
                  />
                )}
              />
            </Grid>
          </>
        )}

        {employmentStatus === 'selfEmployed' && (
          <>
            <Grid item className='step-grid-item'>
              <Controller
                name="businessName"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('step2.businessName')}
                    error={!!errors.businessName}
                    helperText={errors.businessName?.message}
                    inputProps={{ 'aria-label': t('step2.businessName') }}
                  />
                )}
              />
            </Grid>

            <Grid item className='step-grid-item'>
              <Controller
                name="businessType"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('step2.businessType')}
                    error={!!errors.businessType}
                    helperText={errors.businessType?.message}
                    inputProps={{ 'aria-label': t('step2.businessType') }}
                  />
                )}
              />
            </Grid>
          </>
        )}

        <Grid item className='step-grid-item'>
          <Controller
            name="monthlyIncome"
            control={control}
            rules={{
              required: employmentStatus === "unemployed" ? false : t('validation.required'),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={t('step2.monthlyIncome')}
                error={!!errors.monthlyIncome}
                helperText={errors.monthlyIncome?.message}
                required={employmentStatus !== "unemployed"}
                disabled={employmentStatus === "unemployed"}
                inputProps={{ 'aria-label': t('step2.monthlyIncome') }}
              >
                {t('step2.incomeBands', { returnObjects: true }).map((band) => (
                  <MenuItem key={band.value} value={band.value}>
                    {band.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>


        <Grid item className='step-grid-item'>
          <Controller
            name="housingStatus"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step2.housingStatus')}
                error={!!errors.housingStatus}
                helperText={errors.housingStatus?.message}
                required
                inputProps={{ 'aria-label': t('step2.housingStatus') }}
              >
                <MenuItem value="owned">{t('step2.owned')}</MenuItem>
                <MenuItem value="rented">{t('step2.rented')}</MenuItem>
                <MenuItem value="homeless">{t('step2.homeless')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2Family;
