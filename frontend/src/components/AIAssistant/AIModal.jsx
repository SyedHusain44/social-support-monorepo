import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { closeModal, fetchAIAdvice } from "../../features/aiAdvices/aiAdvicesSlice";

const AIModal = () => {
  const { open, loading, suggestion, error, activeField, activeFormData } =
    useAppSelector((state) => state.aiAdvices);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    setEditedText(suggestion);
  }, [suggestion]);

  const handleAccept = () => {
    window.dispatchEvent(
      new CustomEvent("AI_ACCEPT", {
        detail: { fieldName: activeField, text: editedText }
      })
    );
    dispatch(closeModal());
  };

  const handleTryAgain = () => {
    dispatch(fetchAIAdvice({ fieldName: activeField, formData: activeFormData }));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{t("ai.title")}</DialogTitle>

      <DialogContent>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {suggestion && !loading && (
          <TextField
            fullWidth
            multiline
            rows={6}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t("ai.discard")}</Button>

        {error && (
          <Button onClick={handleTryAgain} variant="outlined">
            {t("ai.tryAgain")}
          </Button>
        )}

        {suggestion && !loading && (
          <Button
            onClick={handleAccept}
            variant="contained"
            disabled={!editedText.trim()}
          >
            {t("ai.accept")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AIModal;
