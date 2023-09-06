export const generateId = (currentNth?: number) => {
  return `${currentNth}${Math.random().toString(36)}`;
};
