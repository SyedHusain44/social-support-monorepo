import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    beforeEach(() => {
        document.dir = '';
        global.mockI18n.language = 'en';
    });

    it('should render LanguageSwitcher component', () => {
        const selector = 'LanguageSwitcher';

        render(<App />);

        expect(screen.getByText(selector)).toBeInTheDocument();
    });

    it('should render FormWizard component', () => {
        const selector = 'FormWizard';

        render(<App />);

        expect(screen.getByText(selector)).toBeInTheDocument();
    });

    it('should set document direction to LTR when language is English', () => {
        const expectedValue = 'ltr'
        global.mockI18n.language = 'en';

        render(<App />);

        expect(document.dir).toEqual(expectedValue);
    });

    it('should set document direction to RTL when language is Arabic', () => {
        const expectedValue = 'rtl'
        global.mockI18n.language = 'ar';

        render(<App />);

        expect(document.dir).toEqual(expectedValue);
    });
});
