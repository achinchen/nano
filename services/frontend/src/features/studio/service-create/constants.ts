export enum Step {
  Info,
  Detail,
  Preview,
}

export const STEP_LENGTHS = Object.keys(Step).filter((step) =>
  isNaN(Number(step))
).length;

export const EVENT = {
  info: 'service-create-info',
};
