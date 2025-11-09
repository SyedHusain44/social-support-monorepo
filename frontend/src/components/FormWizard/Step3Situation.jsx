import { Grid, TextField, Typography, Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from "../../hook/useRedux";
import AIButton from '../AIAssistant/AIButton';
import AIModal from '../AIAssistant/AIModal';

const Step3Situation = () => {
  const { t } = useTranslation();
  const { control, formState: { errors }, setValue, watch } = useFormContext();
  const formData = watch();

  const { suggestionList } = useAppSelector((state) => state.aiAdvices);

  const handleAIAccept = (fieldName, text) => {
    setValue(fieldName, text, { shouldValidate: true });
  };

  useEffect(() => {
    const handler = (e) => {
      handleAIAccept(e.detail.fieldName, e.detail.text);
    };
    window.addEventListener("AI_ACCEPT", handler);
    return () => window.removeEventListener("AI_ACCEPT", handler);
  });

  const renderSuggestions = (fieldName) => {
    const suggestions = suggestionList[fieldName] || [];
    if (suggestions.length === 0) return null;

    return (
      <Box
        mt={3}
        sx={{
          borderLeft: "3px solid #ccc",
          pl: 2,
          maxHeight: 200, // fixed height
          overflowY: "auto", // scrollable
          pr: 1,
          backgroundColor: "#fafafa",
          borderRadius: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            position: "sticky",
            top: 0,
            background: "#fafafa",
            pb: 0.5,
            zIndex: 1,
          }}
        >
          {t("ai.previousSuggestions")}
        </Typography>

        {suggestions.map((item, idx) => (
          <Button
            key={idx}
            onClick={() => handleAIAccept(fieldName, item)}
            variant="outlined"
            size="small"
            sx={{
              mb: 1,
              width: "100%",
              textAlign: "left",
              justifyContent: "flex-start",
              whiteSpace: "normal",
              lineHeight: 1.3,
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    );

  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {t('step3.title')}
      </Typography>

      <Grid container className='step-grid'>

        {/* FINANCIAL SITUATION */}
        <Grid item className='step3-grid-item' xs={12}>
          <Controller
            name="financialSituation"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: { value: 20, message: t('validation.minLength', { count: 20 }) },
              maxLength: { value: 500, message: t('validation.maxLength', { count: 500 }) }
            }}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  fullWidth
                  label={t('step3.financialSituation')}
                  multiline
                  value={field.value || ""}
                  rows={4}
                  placeholder={t('step3.financialPlaceholder')}
                  error={!!errors.financialSituation}
                  helperText={errors.financialSituation?.message}
                />

                <AIButton
                  fieldName="financialSituation"
                  formData={formData}
                />

                {renderSuggestions("financialSituation")}
              </div>
            )}
          />
        </Grid>

        {/* EMPLOYMENT CIRCUMSTANCES */}
        <Grid item className='step3-grid-item' xs={12}>
          <Controller
            name="employmentCircumstances"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: { value: 20, message: t('validation.minLength', { count: 20 }) },
              maxLength: { value: 500, message: t('validation.maxLength', { count: 500 }) }
            }}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  fullWidth
                  label={t('step3.employmentCircumstances')}
                  multiline
                  value={field.value || ""}
                  rows={4}
                  placeholder={t('step3.employmentPlaceholder')}
                  error={!!errors.employmentCircumstances}
                  helperText={errors.employmentCircumstances?.message}
                />

                <AIButton
                  fieldName="employmentCircumstances"
                  formData={formData}
                />

                {renderSuggestions("employmentCircumstances")}
              </div>
            )}
          />
        </Grid>

        {/* REASON FOR APPLYING */}
        <Grid item className='step3-grid-item' xs={12}>
          <Controller
            name="reasonForApplying"
            control={control}
            rules={{
              required: t('validation.required'),
              minLength: { value: 20, message: t('validation.minLength', { count: 20 }) },
              maxLength: { value: 500, message: t('validation.maxLength', { count: 500 }) }
            }}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  fullWidth
                  label={t('step3.reasonForApplying')}
                  multiline
                  value={field.value || ""}
                  rows={4}
                  placeholder={t('step3.reasonPlaceholder')}
                  error={!!errors.reasonForApplying}
                  helperText={errors.reasonForApplying?.message}
                />

                <AIButton
                  fieldName="reasonForApplying"
                  formData={formData}
                />

                {renderSuggestions("reasonForApplying")}
              </div>
            )}
          />
        </Grid>

      </Grid>

      <AIModal />
    </div>
  );
};

export default Step3Situation;
