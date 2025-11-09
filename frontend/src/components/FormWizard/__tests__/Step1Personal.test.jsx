import { render, screen, fireEvent, within } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import Step1Personal from '../Step1Personal';
// import { useTranslation } from 'react-i18next';
import { setupTranslationMock } from '../jestUtils'

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

const renderWithForm = (ui) => {
    const Wrapper = ({ children }) => {
        const methods = useForm({ defaultValues: {} });
        return <FormProvider {...methods}>{children}</FormProvider>;
    };
    return render(ui, { wrapper: Wrapper });
};

describe('Step1Personal.jsx', () => {
    beforeEach(() => {
        setupTranslationMock('en')
    });

    it('renders all essential fields', () => {
        // Arrange
        renderWithForm(<Step1Personal />);

        // Assert
        expect(screen.getByLabelText('step1.name')).toBeInTheDocument();
    });

    it('shows country options correctly', () => {
        // Arrange
        renderWithForm(<Step1Personal />);

        // Act
        const countrySelect = screen.getByLabelText('step1.country');
        fireEvent.mouseDown(countrySelect);

        // Assert
        expect(screen.getByText('India')).toBeInTheDocument();
    });

    it('resets state and city when country changes', () => {
        //Arrange
        renderWithForm(<Step1Personal />);
        const countryField = screen.getByLabelText('step1.country');

        //Act
        fireEvent.mouseDown(countryField);
        const listbox = screen.getByRole('listbox');
        const indiaOption = within(listbox).getByText('India');
        fireEvent.click(indiaOption);

        // Assert
        expect(screen.getByLabelText('step1.country')).toHaveTextContent('India');
    });

    it('renders state and city options after country selection', () => {
        //Arrange
        renderWithForm(<Step1Personal />);
        const countryField = screen.getByLabelText('step1.country');

        //Act
        fireEvent.mouseDown(countryField);
        const listbox = screen.getByRole('listbox');
        const indiaOption = within(listbox).getByText('India');
        fireEvent.click(indiaOption);
        const stateField = screen.getByLabelText('step1.state');
        fireEvent.mouseDown(stateField);

        //Assert
        const stateListbox = screen.getByRole('listbox');
        expect(within(stateListbox).getByText('Maharashtra')).toBeInTheDocument();
    });

    it('renders validation message when field has error', () => {
        // Arrange
        const Wrapper = () => {
            const methods = useForm({
                defaultValues: { name: '' },
                mode: 'onChange',
            });
            methods.formState.errors.name = { message: 'validation.required' };
            return (
                <FormProvider {...methods}>
                    <Step1Personal />
                </FormProvider>
            );
        };

        render(<Wrapper />);

        // Assert
        expect(screen.getByText('validation.required')).toBeInTheDocument();
    });
});
