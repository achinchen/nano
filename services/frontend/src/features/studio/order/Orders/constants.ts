export const CONTENT = {
  IN_PROGRESS: 'progress',
  END: 'end',
} as const;

export const CONTENT_TYPE = [...Object.keys(CONTENT)] as const;
