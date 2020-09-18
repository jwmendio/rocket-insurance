const formatNumberToMoneyWithCommas = (num) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return Number(num).toLocaleString('en', options);
};

export default formatNumberToMoneyWithCommas;
