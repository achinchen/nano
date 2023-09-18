import { Fragment } from 'react';
import { Step } from './Step';
import { Progress } from './Progress';

type StepProgressProps = {
  steps: number;
  currentStep: number;
  value?: number;
  onBack?: (step: number) => void;
};

const COMPLETE_VALUE = undefined;
const INCOMPLETE_VALUE = 0;

export function StepProgress({
  steps,
  currentStep,
  value = INCOMPLETE_VALUE,
  onBack,
}: StepProgressProps) {
  const maxStepIndex = steps - 1;
  const currentStepIndex = currentStep - 1;
  const onClick = (index: number) => () => onBack?.(index + 1);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: steps }, (_, index) => (
        <Fragment key={index}>
          <Step
            key={`step-${index}`}
            completed={index <= currentStepIndex}
            onClick={onClick(index)}
          />
          {maxStepIndex > index && (
            <Progress
              key={`progress-${index}`}
              value={
                index === currentStepIndex
                  ? value
                  : index > currentStepIndex
                  ? INCOMPLETE_VALUE
                  : COMPLETE_VALUE
              }
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default StepProgress;
