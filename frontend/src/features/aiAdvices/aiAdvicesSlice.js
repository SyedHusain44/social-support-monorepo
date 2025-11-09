import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/chat";
const TIMEOUT = 20000;

// Thunk
export const fetchAIAdvice = createAsyncThunk(
    "aiAdvices/fetchAIAdvice",
    async ({ fieldName, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                BACKEND_URL,
                { fieldName, formData },
                { timeout: TIMEOUT }
            );

            return { reply: response.data.reply, fieldName };
        } catch (error) {
            if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
                return rejectWithValue("Request timed out. Try again.");
            }

            if (error.response) {
                if (error.response.status === 429)
                    return rejectWithValue("Rate limit exceeded. Please try later.");
                if (error.response.status === 401)
                    return rejectWithValue("Unauthorized request.");
            }

            return rejectWithValue(error.message || "Failed to get AI response.");
        }
    }
);

const aiAdvicesSlice = createSlice({
    name: "aiAdvices",
    initialState: {
        open: false,
        loading: false,
        suggestionList: {
            financialSituation: [],
            reasonForApplying: [],
            employmentCircumstances: []
        },
        suggestion: "",
        error: "",
        activeField: null,
        activeFormData: null
    },
    reducers: {
        openModal: (state, action) => {
            state.open = true;
            state.error = "";
            state.suggestion = "";
            state.activeField = action.payload.fieldName;
            state.activeFormData = action.payload.formData;
        },
        closeModal: (state) => {
            state.open = false;
            state.error = "";
        },
        clearActiveFormData: (state) => {
            state.activeFormData = null;
            state.activeField = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAIAdvice.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.suggestion = "";
            })
            .addCase(fetchAIAdvice.fulfilled, (state, action) => {
                state.loading = false;

                const { reply, fieldName } = action.payload;

                // update the current modal suggestion
                state.suggestion = reply;

                // store all suggestions by field name
                if (state.suggestionList[fieldName]) {
                    state.suggestionList[fieldName].push(reply);
                } else {
                    // if new field appears (just in case)
                    state.suggestionList[fieldName] = [reply];
                }
            })
            .addCase(fetchAIAdvice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { openModal, closeModal, clearActiveFormData } = aiAdvicesSlice.actions;
export default aiAdvicesSlice;
