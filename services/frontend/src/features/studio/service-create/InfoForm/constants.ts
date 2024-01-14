import i from './i.json';

export enum InfoStep {
  Name,
  Description,
  Detail,
  Time,
  Queue,
}

export const STEPS = [
  {
    value: InfoStep.Name,
    ...i.step.name,
  },
  {
    value: InfoStep.Description,
    ...i.step.description,
  },
  {
    value: InfoStep.Detail,
    ...i.step.detail,
  },
  {
    value: InfoStep.Time,
    ...i.step.time,
  },
  {
    value: InfoStep.Queue,
    ...i.step.queue,
  },
];

export const INFO_STEP_LENGTHS = Object.keys(InfoStep).filter((step) =>
  isNaN(Number(step))
).length;

export const LABEL_CLASSNAME = 'text-base font-normal flex flex-col gap-2';
