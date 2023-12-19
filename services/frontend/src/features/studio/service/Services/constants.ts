export const STATUS = {
  IN_PROGRESS: 'progress',
  END: 'end',
} as const;

export const STATUS_TYPE = [...Object.keys(STATUS)] as const;
