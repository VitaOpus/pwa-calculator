export const formatMoney = (number: number, currency: string) => {
  return new Intl.NumberFormat('ru-RU', { currency, style: 'currency' }).format(number);
};

export default { formatMoney };
