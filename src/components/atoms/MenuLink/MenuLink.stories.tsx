import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuLinkComponent from "./MenuLink";

const meta = {
  title: "Component/atoms/MenuLink",
  component: MenuLinkComponent,
} satisfies Meta<typeof MenuLinkComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuLink: Story = {
  args: {
    label: "Menu Link text",
    url: '#',
  },
};
