import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepProgress from '.';

describe('StepProgress', () => {
  const steps = 3;

  it('renders the correct number of steps', () => {
    const currentStep = 1;
    render(<StepProgress steps={steps} currentStep={currentStep} />);
    const stepElements = screen.getAllByRole('button');
    expect(stepElements).toHaveLength(steps);
  });

  it('renders the correct number of progress bars', () => {
    const currentStep = 1;
    render(<StepProgress steps={steps} currentStep={currentStep} />);
    const progressElements = screen.getAllByRole('progressbar');
    expect(progressElements).toHaveLength(steps - 1);
  });

  it('calls the onBack function when a step is clicked', async () => {
    const steps = 3;
    const currentStep = 2;
    const onBack = jest.fn();
    render(
      <StepProgress steps={steps} currentStep={currentStep} onBack={onBack} />
    );
    const stepElements = screen.getAllByRole('button');
    const targetStep = 1;
    await userEvent.click(stepElements[targetStep - 1]);
    expect(onBack).toHaveBeenCalledWith(targetStep);
  });
});
