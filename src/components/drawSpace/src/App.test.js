import React from 'react';
import { render } from '@testing-library/react';
import Drawspace from './App';

test('renders learn react link', () => {
  const { getByText } = render(<Drawspace />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
