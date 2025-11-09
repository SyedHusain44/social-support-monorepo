import '@testing-library/jest-dom';

// --- Global Jest mocks ---

// Mock theme
jest.mock('./src/styles/theme', () => ({
    getTheme: jest.fn(() => ({
        spacing: (factor) => `${0.25 * factor}rem`,
        typography: { fontWeightBold: 700 },
        palette: {
            mode: 'light',
            background: { default: '#fff' },
            primary: { main: '#1976d2', contrastText: '#fff' },
            text: { primary: '#000' },
            common: { white: '#ffffff', black: '#000000' },
        },
        breakpoints: {
            values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
            up: (key) => `@media (min-width:${{ xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }[key]}px)`,
            down: (key) => `@media (max-width:${{ xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }[key]}px)`,
        },
        shape: { borderRadius: 4 },
        shadows: Array(25).fill('none'),
    })),
}));

// Mock components
jest.mock('./src/components/RTL', () => ({ children }) => <div data-testid="rtl-wrapper">{children}</div>);
jest.mock('./src/components/LanguageSwitcher/LanguageSwitcher', () => () => <div>LanguageSwitcher</div>);
jest.mock('./src/components/FormWizard/FormWizard', () => () => <div>FormWizard</div>);

// Mock i18n
const mockI18n = { language: 'en', changeLanguage: jest.fn() };
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: mockI18n,
        t: (key) => key,
    }),
}));

global.mockI18n = mockI18n;

const originalWarn = console.warn;
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((message, ...args) => {
        if (
            typeof message === 'string' &&
            message.includes('MUI: You have provided an out-of-range value')
        ) {
            return; // ignore MUI select warnings
        }
        originalWarn(message, ...args);
    });
});

afterAll(() => {
    console.warn.mockRestore();
});

