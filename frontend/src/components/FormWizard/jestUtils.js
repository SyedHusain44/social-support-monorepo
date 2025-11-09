// src/components/FormWizard/__tests__/testUtils.js
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    // Preserve other exports if you ever use them
    ...jest.requireActual('react-i18next'),
    useTranslation: jest.fn(),
}));

export const setupTranslationMock = (lang = 'en') => {
    useTranslation.mockReturnValue({
        t: (key, opts) => (opts?.count ? `${key} ${opts.count}` : key),
        i18n: { language: lang, dir: () => (lang === 'ar' ? 'rtl' : 'ltr') },
    });
};

export const renderWithForm = (ui, defaultValues = {}) => {
    const Wrapper = ({ children }) => {
        const methods = useForm({ defaultValues });
        return <FormProvider {...methods}>{children}</FormProvider>;
    };
    return render(ui, { wrapper: Wrapper });
};
