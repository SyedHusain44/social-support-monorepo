import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import Step3Situation from "../Step3Situation";

jest.mock("react-i18next", () => ({
    useTranslation: jest.fn(() => ({
        t: (key, opts) => {
            if (key === "validation.minLength") return `Minimum length ${opts?.count}`;
            if (key === "validation.maxLength") return `Maximum length ${opts?.count}`;
            return key;
        },
        i18n: { language: "en", dir: () => "ltr" },
    })),
}));

jest.mock("../../../hook/useRedux", () => ({
    useAppSelector: jest.fn(() => ({
        suggestionList: {
            financialSituation: [],
            employmentCircumstances: [],
            reasonForApplying: [],
        },
    })),
}));

jest.mock("../../AIAssistant/AIButton", () =>
    jest.fn(() => <div data-testid="ai-button" />)
);
jest.mock("../../AIAssistant/AIModal", () =>
    jest.fn(() => <div data-testid="ai-modal" />)
);

const renderWithForm = (defaultValues = {}) => {
    const Wrapper = ({ children }) => {
        const methods = useForm({ defaultValues });
        return <FormProvider {...methods}>{children}</FormProvider>;
    };
    return render(
        <Wrapper>
            <Step3Situation />
        </Wrapper>
    );
};

describe("Step3Situation", () => {
    it("renders the section title", () => {
        renderWithForm();
        expect(screen.getByText("step3.title")).toBeInTheDocument();
    });

    it("renders all three text fields", () => {
        renderWithForm();
        expect(screen.getByLabelText("step3.financialSituation")).toBeInTheDocument();
        expect(screen.getByLabelText("step3.employmentCircumstances")).toBeInTheDocument();
        expect(screen.getByLabelText("step3.reasonForApplying")).toBeInTheDocument();
    });

    it("renders AIButton for each Controller field", () => {
        renderWithForm();
        const aiButtons = screen.getAllByTestId("ai-button");
        expect(aiButtons).toHaveLength(3);
    });

    it("renders AIModal component", () => {
        renderWithForm();
        expect(screen.getByTestId("ai-modal")).toBeInTheDocument();
    });

    it("shows required validation error for financialSituation", () => {
        const Wrapper = () => {
            const methods = useForm();
            methods.formState.errors.financialSituation = { message: "validation.required" };
            return (
                <FormProvider {...methods}>
                    <Step3Situation />
                </FormProvider>
            );
        };

        render(<Wrapper />);
        expect(screen.getByText("validation.required")).toBeInTheDocument();
    });

});
