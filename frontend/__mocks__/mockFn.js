export const mockTheme = () => {
    return () => ({
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
    })
}