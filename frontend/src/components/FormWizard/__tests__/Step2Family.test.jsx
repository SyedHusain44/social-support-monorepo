import { render, screen, fireEvent, within } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import Step2Family from '../Step2Family';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(() => ({
        t: (key) => {
            if (key === 'step2.incomeBands') {
                return [
                    { value: 'low', label: 'Below 10k' },
                    { value: 'mid', label: '10k–50k' },
                ];
            }
            return key;
        },
        i18n: { language: 'en', dir: () => 'ltr' },
    })),
}));

const renderWithForm = (defaultValues = {}) => {
    const Wrapper = ({ children }) => {
        const methods = useForm({ defaultValues });
        return <FormProvider {...methods}>{children}</FormProvider>;
    };
    return render(
        <Wrapper>
            <Step2Family />
        </Wrapper>
    );
};

describe('Step2Family', () => {

    it('should render all base fields', () => {
        // Arrange
        renderWithForm();

        // Assert
        const allFieldsPresent =
            screen.getByLabelText('step2.maritalStatus') &&
            screen.getByLabelText('step2.dependents') &&
            screen.getByLabelText('step2.employmentStatus') &&
            screen.getByLabelText('step2.monthlyIncome') &&
            screen.getByLabelText('step2.housingStatus');

        expect(allFieldsPresent).toBeTruthy();
    });

    it('should render dependents field as a number input', () => {
        // Arrange
        renderWithForm();

        // Act
        const dependentsField = screen.getByLabelText('step2.dependents');

        // Assert
        expect(dependentsField).toHaveAttribute('type', 'number');
    });

    it('should disable monthly income field when unemployed', () => {
        // Arrange
        renderWithForm({ employmentStatus: 'unemployed' });

        // Act
        const incomeField = screen.getByLabelText('step2.monthlyIncome');

        // Assert
        expect(incomeField).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render employerName and jobTitle when employed', () => {
        // Arrange
        renderWithForm({ employmentStatus: 'employed' });

        // Assert
        const bothFieldsPresent =
            screen.getByLabelText('step2.employerName') &&
            screen.getByLabelText('step2.jobTitle');

        expect(bothFieldsPresent).toBeTruthy();
    });

    it('should render businessName and businessType when self-employed', () => {
        // Arrange
        renderWithForm({ employmentStatus: 'selfEmployed' });

        // Assert
        const bothFieldsPresent =
            screen.getByLabelText('step2.businessName') &&
            screen.getByLabelText('step2.businessType');

        expect(bothFieldsPresent).toBeTruthy();
    });

    it('should display income options from translation data', () => {
        // Arrange
        renderWithForm();

        // Act
        const select = screen.getByLabelText('step2.monthlyIncome');
        fireEvent.mouseDown(select);
        const listbox = screen.getByRole('listbox');
        const bothOptionsPresent =
            within(listbox).getByText('Below 10k') &&
            within(listbox).getByText('10k–50k');

        // Assert
        expect(bothOptionsPresent).toBeTruthy();
    });

    it('should render housing status options', () => {
        // Arrange
        renderWithForm();

        // Act
        const select = screen.getByLabelText('step2.housingStatus');
        fireEvent.mouseDown(select);
        const listbox = screen.getByRole('listbox');
        const rentedOption = within(listbox).getByText('step2.rented');

        // Assert
        expect(rentedOption).toBeInTheDocument();
    });

    it('should display validation message when marital status has error', () => {
        // Arrange
        const Wrapper = () => {
            const methods = useForm();
            methods.formState.errors.maritalStatus = { message: 'validation.required' };
            return (
                <FormProvider {...methods}>
                    <Step2Family />
                </FormProvider>
            );
        };

        render(<Wrapper />);

        // Act
        const validationMessage = screen.getByText('validation.required');

        // Assert
        expect(validationMessage).toBeInTheDocument();
    });

    it('should keep income field enabled when employed', () => {
        // Arrange
        renderWithForm({ employmentStatus: 'employed' });

        // Act
        const incomeField = screen.getByLabelText('step2.monthlyIncome');

        // Assert
        expect(incomeField).not.toBeDisabled();
    });

    it('should set layout direction based on i18n', () => {
        // Arrange
        renderWithForm();

        // Act
        const titleDiv = screen.getByText('step2.title').closest('div');

        // Assert
        expect(titleDiv).toHaveStyle({ direction: 'ltr' });
    });
});
