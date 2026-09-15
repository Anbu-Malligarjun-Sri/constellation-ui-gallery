import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PegaExtensionsSplitFlapText, { type SplitFlapTextProps } from './index';

const meta = {
  title: 'Widgets/Split Flap Text',
  component: PegaExtensionsSplitFlapText,
  argTypes: {
    words: { control: 'object' },
    charset: {
      options: ['alpha', 'alphanumeric', 'numeric'],
      control: { type: 'select' },
    },
    loop: { control: 'boolean' },
  },
} satisfies Meta<typeof PegaExtensionsSplitFlapText>;

export default meta;

type Story = StoryObj<SplitFlapTextProps>;

export const Default: Story = {
  args: {
    text: 'LAUNCH READY',
    words: ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
    flipDuration: 0.12,
    stagger: 0.06,
    cycleDelay: 2400,
    charset: 'alphanumeric',
    flipsPerChar: 8,
    tileColor: '#111827',
    textColor: '#f8fafc',
    tileRadius: 8,
    gap: 6,
    fontSize: 52,
    loop: true,
    padTo: 12,
  },
};