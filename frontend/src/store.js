import { configureStore } from '@reduxjs/toolkit';
import aiAdvicesReducer from './features/aiAdvices/aiAdvicesSlice';

export const store = configureStore({
    reducer: {
        aiAdvices: aiAdvicesReducer.reducer
    }
});
