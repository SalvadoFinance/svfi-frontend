export const numberFormatUnit = (value: number) => {
  let result: { value: string | number; unit: string } = { value, unit: '' };

  if (!value) {
    result.value = '--';
    return result;
  }

  const k = 1000;

  const units = ['', 'K', 'M', 'B'];

  if (value >= k) {
    const i = Math.floor(Math.log(value) / Math.log(k));

    result = {
      value: Number((value / Math.pow(k, i)).toFixed(2)),
      unit: units[i],
    };
  }

  return result;
};
