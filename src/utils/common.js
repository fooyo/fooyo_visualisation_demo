export const formatThousand = (distance) => {
  let num = ((distance || 0) / 1000).toFixed(1);
  if (num.endsWith(".0")) {
    num = parseInt(num, 10);
  }
  return num;
};

export const formatOneDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

export const formatTimeUnit = (value) => {
  const day = Math.floor(value / (60 * 24));
  const hour = Math.floor((value % (60 * 24)) / 60);
  const minute = value % 60;

  const dayDisplay = day > 0 ? `${day}d` : "";
  const hourDisplay = hour > 0 ? `${hour}h` : "";
  const minuteDisplay = minute > 0 ? `${minute}m` : "";

  return [dayDisplay, hourDisplay, minuteDisplay]
    .filter((element) => element !== "")
    .join(" ");
};
