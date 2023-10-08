export const formatDate = (date: Date) => {
  const dateString = date.toLocaleDateString('zh-TW', {
    dateStyle: 'long',
  });
  return dateString;
};
