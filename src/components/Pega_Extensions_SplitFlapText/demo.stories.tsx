import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PegaExtensionsSplitFlapText, { type SplitFlapTextProps } from './index';

const meta = {
  title: 'Widgets/Split Flap Text',
  component: PegaExtensionsSplitFlapText,
  argTypes: {
    text: { control: 'text' },
  },
} satisfies Meta<typeof PegaExtensionsSplitFlapText>;

export default meta;

type Story = StoryObj<SplitFlapTextProps>;

export const Default: Story = {
  args: {
    text: 'LAUNCH READY',
    tileColor: '#111827',
    textColor: '#f8fafc',
    tileRadius: 8,
    gap: 6,
    fontSize: 52,
  },
};

export const AutoSized: Story = {
  args: {
    ...Default.args,
    text: 'HELLO',
  },
};