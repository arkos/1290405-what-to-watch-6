import dayjs from 'dayjs';

export const formatDate = (date, template) => {
  return dayjs(date).format(template);
};
