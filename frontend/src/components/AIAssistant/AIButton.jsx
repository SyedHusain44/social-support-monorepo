import React from "react";
import { Button, CircularProgress } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hook/useRedux";
import { openModal, fetchAIAdvice } from "../../features/aiAdvices/aiAdvicesSlice";

const AIButton = ({ fieldName, formData }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal({ fieldName, formData }));
    dispatch(fetchAIAdvice({ fieldName, formData }));
  };

  return (
    <Button
      variant="outlined"
      startIcon={<AutoAwesomeIcon />}
      onClick={handleClick}
      sx={{ mt: 1 }}
      aria-label={t("step3.helpMeWrite")}
    >
      {t("step3.helpMeWrite")}
    </Button>
  );
};

export default AIButton;
