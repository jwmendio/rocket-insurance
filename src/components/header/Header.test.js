import { render } from '@testing-library/react';
import React from 'react';

import Header from './Header';

test('renders text - Spaceway Insurance', () => {
  const { getByText } = render(<Header />);
  const textElement = getByText(/Spaceway Insurance/i);
  expect(textElement).toBeInTheDocument();
});
