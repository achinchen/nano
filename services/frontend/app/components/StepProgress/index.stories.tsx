import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { StepProgress } from '.';

const Story: Meta<typeof StepProgress> = {
  component: StepProgress,
  title: 'StepProgress',
};
export default Story;

export const Default = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [value, setValue] = useState(5);
  const onBack = (step: number) => {
    setCurrentStep(step);
    setValue(0);
  };

  return (
    <StepProgress
      steps={4}
      currentStep={currentStep}
      value={value}
      onBack={onBack}
    />
  );
};
