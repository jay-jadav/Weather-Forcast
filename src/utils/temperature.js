export const convertTemp = (temp, isCelsius) => {
  if (isCelsius) return Math.round(temp);
  return Math.round((temp * 9) / 5 + 32);
};
