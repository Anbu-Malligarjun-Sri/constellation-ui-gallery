import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
jest.mock('./SplitFlapText.css', () => ({}));
import * as DemoStories from './demo.stories';

const { Default, AutoSized } = composeStories(DemoStories);

test('renders the default split flap phrase', () => {
  const { container } = render(<Default />);
  expect(container.querySelector('.split-flap-text')).toHaveAttribute('aria-label', 'LAUNCH READY');
  expect(container.querySelectorAll('.split-flap-text__half')).toHaveLength(24);
});

test('sizes the tiles to the single text value', () => {
  const { container } = render(<AutoSized />);

  expect(container.querySelector('.split-flap-text')).toHaveAttribute('aria-label', 'HELLO');
  expect(container.querySelectorAll('.split-flap-text__tile')).toHaveLength(5);
});