export const formatThousand = (distance) => {
  let num = ((distance || 0) / 1000).toFixed(1);
  if (num.endsWith(".0")) {
    num = parseInt(num, 10);
  }
  return num;
};

export const formatTimeUnit = (value) => {
  const hour = Math.floor(value / 60);
  const minute = value - hour * 60;
  if (hour && minute) {
    return `${hour}h${minute}m`;
  }
  if (hour) {
    return `${hour}h`;
  }
  return `${minute}m`;
};
