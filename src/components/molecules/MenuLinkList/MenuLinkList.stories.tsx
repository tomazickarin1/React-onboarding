import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuLinkListComponent from "./MenuLinkList";

const meta = {
  title: "Component/molecules/MenuLinkList",
  component: MenuLinkListComponent,
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof MenuLinkListComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuLinkList: Story = {
  args: {
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
};
