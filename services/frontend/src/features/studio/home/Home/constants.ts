export const CONTENT = {
  SERVICE: 'service',
  ORDER: 'order',
} as const;

export const CONTENT_TYPE = [...Object.keys(CONTENT)] as const;
