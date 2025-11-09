import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import locations from '../../data/locations';

const Step1Personal = () => {
  const { t, i18n } = useTranslation();
  const { control, formState: { errors }, setValue, watch } = useFormContext();

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  // derive options
  const countryOptions = locations.countries;
  const countryObj = countryOptions.find(c => c.code === selectedCountry);
  const stateOptions = countryObj ? countryObj.states : [];
  const stateObj = stateOptions.find(s => s.code === selectedState);
  const cityOptions = stateObj ? stateObj.cities : [];

  const getMaxDob = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  };
  const maxDob = getMaxDob();

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {t('step1.title')}
      </Typography>

      <Grid container className='step-grid' >
        <Grid item className='step-grid-item'>
          <Controller defaultValue=""
            name="name"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: { value: 3, message: t('validation.minLength', { count: 3 }) }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('step1.name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                required
                inputProps={{
                  'aria-label': t('step1.name'),
                  dir: i18n.language === 'ar' ? 'rtl' : 'ltr',
                  lang: i18n.language,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    transformOrigin: i18n.language === 'ar' ? 'right' : 'left',
                  },
                  '& .MuiOutlinedInput-root': {
                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="nationalId"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: { value: 5, message: t('validation.minLength', { count: 5 }) }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('step1.nationalId')}
                error={!!errors.nationalId}
                helperText={errors.nationalId?.message}
                required
                inputProps={{ 'aria-label': t('step1.nationalId') }}
              />
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="dateOfBirth"
            control={control}
            rules={{
              required: t('validation.required'),
              validate: value => {
                if (!value) return true;
                const dob = new Date(value);
                const cutoff = new Date();
                cutoff.setHours(0, 0, 0, 0);
                cutoff.setFullYear(cutoff.getFullYear() - 18);
                return dob <= cutoff || t('validation.ageRestriction');
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label={t('step1.dateOfBirth')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                required
                inputProps={{
                  'aria-label': t('step1.dateOfBirth'),
                  max: maxDob,
                  dir: i18n.language === 'ar' ? 'rtl' : 'ltr',
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="gender"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step1.gender')}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                required
                inputProps={{ 'aria-label': t('step1.gender') }}
              >
                <MenuItem value="male">{t('step1.male')}</MenuItem>
                <MenuItem value="female">{t('step1.female')}</MenuItem>
                <MenuItem value="other">{t('step1.other')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12}>
          <Controller defaultValue=""
            name="address"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: { value: 10, message: t('validation.minLength', { count: 10 }) }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('step1.address')}
                multiline
                rows={2}
                error={!!errors.address}
                helperText={errors.address?.message}
                required
                inputProps={{ 'aria-label': t('step1.address') }}
              />
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="country"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step1.country')}
                error={!!errors.country}
                helperText={errors.country?.message}
                required
                inputProps={{ 'aria-label': t('step1.country'), dir: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                onChange={(e) => {
                  field.onChange(e);
                  // reset dependent fields
                  setValue('state', '');
                  setValue('city', '');
                }}
              >
                {countryOptions.map(c => (
                  <MenuItem key={c.code} value={c.code} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                    {c.names[i18n.language] || c.names.en}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="state"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step1.state')}
                error={!!errors.state}
                helperText={errors.state?.message}
                required
                inputProps={{ 'aria-label': t('step1.state'), dir: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
                onChange={(e) => {
                  field.onChange(e);
                  setValue('city', '');
                }}
              >
                {stateOptions.length === 0 && (
                  <MenuItem value="">{t('step1.selectCountryFirst') || 'Select country first'}</MenuItem>
                )}
                {stateOptions.map(s => (
                  <MenuItem key={s.code} value={s.code} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                    {s.names[i18n.language] || s.names.en}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="city"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label={t('step1.city')}
                error={!!errors.city}
                helperText={errors.city?.message}
                required
                inputProps={{ 'aria-label': t('step1.city'), dir: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
              >
                {cityOptions.length === 0 && (
                  <MenuItem value="">{t('step1.selectStateFirst') || 'Select state first'}</MenuItem>
                )}
                {cityOptions.map(c => (
                  <MenuItem key={c.code} value={c.code} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                    {c.names[i18n.language] || c.names.en}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12} sm={6}>
          <Controller defaultValue=""
            name="phone"
            control={control}
            rules={{
              required: t('validation.required'),
              pattern: { value: /^[0-9+\-() ]+$/, message: t('validation.phone') }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('step1.phone')}
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
                inputProps={{ 'aria-label': t('step1.phone') }}
              />
            )}
          />
        </Grid>

        <Grid item className='step-grid-item' xs={12}>
          <Controller defaultValue=""
            name="email"
            control={control}
            rules={{
              required: t('validation.required'),
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('validation.email') }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('step1.email')}
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                inputProps={{ 'aria-label': t('step1.email') }}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Step1Personal;
