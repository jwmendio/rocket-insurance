import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import RatingInformation from './RatingInformation';

it('should render h1 Rating Information', () => {
  const { getByRole } = render(<RatingInformation />);
  expect(getByRole('heading')).toHaveTextContent('Rating Information');
});

it('should not allow user to Continue with missing information', () => {
  const { getByTestId, getByText } = render(<RatingInformation />);
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');

  const inputFirstNameNode = getByTestId('first-name-textfield');
  const inputLastNameNode = getByTestId('last-name-textfield');
  const inputAddressLine1Node = getByTestId('address-1-textfield');
  const inputCityNode = getByTestId('city-textfield');
  const selectStateNode = getByTestId('state-select-label');
  const inputZipNode = getByTestId('zip-textfield');

  fireEvent.change(inputFirstNameNode, { target: { value: 'Kobe' } });
  expect(inputFirstNameNode.value).toBe('Kobe');
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');

  fireEvent.change(inputLastNameNode, { target: { value: 'Bryant' } });
  expect(inputLastNameNode.value).toBe('Bryant');
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');

  fireEvent.change(inputAddressLine1Node, { target: { value: '1111 S Figueroa St' } });
  expect(inputAddressLine1Node.value).toBe('1111 S Figueroa St');
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');

  fireEvent.change(inputCityNode, { target: { value: 'Los Angeles' } });
  expect(inputCityNode.value).toBe('Los Angeles');
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');

  fireEvent.change(selectStateNode, { target: { value: 'CA' } });
  expect(selectStateNode.value).toBe('CA');
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');

  fireEvent.change(inputZipNode, { target: { value: '9001' } });
  expect(inputZipNode.value).toBe('9001');
  expect(getByText(/Continue/i).closest('button')).toHaveAttribute('disabled');
});

it('should allow user to Continue with completed information', () => {
  const { getByTestId, getByText } = render(<RatingInformation />);

  const inputFirstNameNode = getByTestId('first-name-textfield');
  const inputLastNameNode = getByTestId('last-name-textfield');
  const inputAddressLine1Node = getByTestId('address-1-textfield');
  const inputCityNode = getByTestId('city-textfield');
  const selectStateNode = getByTestId('state-select-label');
  const inputZipNode = getByTestId('zip-textfield');

  fireEvent.change(inputFirstNameNode, { target: { value: 'Kobe' } });
  expect(inputFirstNameNode.value).toBe('Kobe');

  fireEvent.change(inputLastNameNode, { target: { value: 'Bryant' } });
  expect(inputLastNameNode.value).toBe('Bryant');

  fireEvent.change(inputAddressLine1Node, { target: { value: '1111 S Figueroa St' } });
  expect(inputAddressLine1Node.value).toBe('1111 S Figueroa St');

  fireEvent.change(inputCityNode, { target: { value: 'Los Angeles' } });
  expect(inputCityNode.value).toBe('Los Angeles');

  fireEvent.change(selectStateNode, { target: { value: 'CA' } });
  expect(selectStateNode.value).toBe('CA');

  fireEvent.change(inputZipNode, { target: { value: '90015' } });
  expect(inputZipNode.value).toBe('90015');
  expect(getByText(/Continue/i).closest('button')).not.toHaveAttribute('disabled');
});
