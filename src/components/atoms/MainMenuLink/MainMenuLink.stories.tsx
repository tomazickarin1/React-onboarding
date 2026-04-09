import type { Meta, StoryObj } from "@storybook/react-vite";

import MainMenuLink from "./MainMenuLink";

const meta = {
  title: "Component/atoms/MainMenuLink",
  component: MainMenuLink,
} satisfies Meta<typeof MainMenuLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "MainMenuLink text",
    url: '#',
    handleMenuToggle: () => {},
  },
};
