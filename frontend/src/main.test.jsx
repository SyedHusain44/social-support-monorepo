import * as ReactDOM from 'react-dom/client';

const mockRoot = { render: jest.fn() };
jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(() => mockRoot),
}));

jest.mock('./i18n', () => ({
    dir: jest.fn(() => 'ltr'),
    language: 'en',
    changeLanguage: jest.fn(),
}));

describe('main.jsx', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should call ReactDOM.createRoot when main.jsx is executed', () => {
        const rootElement = document.getElementById('root');

        jest.isolateModules(() => {
            require('./main.jsx');
        });

        expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootElement);
    });

    it('should call ReactDOM.createRoot exactly once', () => {
        const expectedValue = 1;

        jest.isolateModules(() => {
            require('./main.jsx');
        });

        expect(ReactDOM.createRoot).toHaveBeenCalledTimes(expectedValue);
    });

    it('should call render() exactly once on the created root', () => {
        const expectedValue = 1;

        jest.isolateModules(() => {
            require('./main.jsx');
        });

        expect(mockRoot.render).toHaveBeenCalledTimes(expectedValue);
    });

    it('should render a valid React element', () => {
        jest.isolateModules(() => {
            require('./main.jsx');
        });

        const renderArg = mockRoot.render.mock.calls[0][0];
        expect(renderArg).toBeTruthy();
    });
});
