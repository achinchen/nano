export const formatDate = (date: Date) => {
  const dateString = date.toLocaleDateString('zh-TW', {
    dateStyle: 'full',
  });
  return dateString;
};
