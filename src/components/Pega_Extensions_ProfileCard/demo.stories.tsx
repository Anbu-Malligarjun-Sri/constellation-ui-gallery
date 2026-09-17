import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PegaExtensionsProfileCard } from './index';

const meta = {
  title: 'Widgets/Profile Card',
  component: PegaExtensionsProfileCard,
  argTypes: {
    imageProperty: {
      description: 'Mapped case property containing an image URL, data URI, or Pega image asset key.',
    },
    imageUrl: {
      control: 'text',
      description: 'Direct image URL used for Storybook or external image sources.',
    },
    enableTilt: { control: 'boolean' },
    enableMobileTilt: { control: 'boolean' },
  },
} satisfies Meta<typeof PegaExtensionsProfileCard>;

export default meta;

type Story = StoryObj<typeof PegaExtensionsProfileCard>;

export const Default: Story = {
  render: (args) => {
    window.PCore = {
      getNameSpaceUtils: () => ({
        getDefaultQualifiedName: (key: string) => key,
      }),
      getEnvironmentInfo: () => ({
        getKeyMapping: (key: string) => key,
      }),
    } as unknown as typeof PCore;

    return (
      <PegaExtensionsProfileCard
        {...args}
        getPConnect={() =>
          ({
            getValue: () => '',
          }) as unknown as typeof PConnect
        }
      />
    );
  },
  args: {
    name: 'Javi A. Torres',
    title: 'Software Engineer',
    handle: 'javicodes',
    status: 'Online',
    imageProperty: '',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    showUserInfo: true,
    enableTilt: true,
    enableMobileTilt: false,
  },
};

export const MappedImage: Story = {
  ...Default,
  args: {
    ...Default.args,
    name: 'Case contact',
    title: 'Customer profile',
    handle: 'case-contact',
    status: 'Verified',
    imageUrl: '',
    imageProperty: 'ProfileImage',
  },
};
