import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as DemoStories from './demo.stories';

const { Default } = composeStories(DemoStories);

test('renders the profile card with identity details', () => {
  render(<Default />);

  expect(screen.getByRole('article', { name: 'Javi A. Torres, Software Engineer' })).toBeVisible();
  expect(screen.getByText('Javi A. Torres')).toBeVisible();
  expect(screen.getByText('@javicodes')).toBeVisible();
  expect(screen.getByText('Online')).toBeVisible();
});

test('falls back to initials when an image is not available', () => {
  render(<Default imageUrl='' />);

  expect(screen.getByText('JA')).toBeVisible();
});
