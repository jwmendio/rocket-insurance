import formatNumberToMoneyWithCommas from './format';

it('should remove leading 0s', () => {
  expect(formatNumberToMoneyWithCommas('000100')).toBe('100.00');
});

it('should remove leading and/or trailing whitespace', () => {
  expect(formatNumberToMoneyWithCommas('  000100000')).toBe('100,000.00');
  expect(formatNumberToMoneyWithCommas('100000     ')).toBe('100,000.00');
});

it('should round up numbers to two decimal places', () => {
  expect(formatNumberToMoneyWithCommas('100.256')).toBe('100.26');
  expect(formatNumberToMoneyWithCommas('100.254')).toBe('100.25');
});

it('should format long numbers with commas', () => {
  expect(formatNumberToMoneyWithCommas('100000')).toBe('100,000.00');
  expect(formatNumberToMoneyWithCommas('123456')).toBe('123,456.00');
  expect(formatNumberToMoneyWithCommas('1234567890')).toBe('1,234,567,890.00');
});
