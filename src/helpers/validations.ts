export const isPositiveInteger = (integer: string) => {
  const regex = /^[1-9]\d*$/;
  return regex.test(integer);
};
