import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuLink from "./MenuLink";

const meta = {
  title: "Component/atoms/MenuLink",
  component: MenuLink,
} satisfies Meta<typeof MenuLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "MenuLink text",
    url: '#',
  },
};
