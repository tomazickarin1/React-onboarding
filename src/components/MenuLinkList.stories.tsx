import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuLinkList from "./MenuLinkList";

const meta = {
  title: "Component/MenuLinkList",
  component: MenuLinkList,
} satisfies Meta<typeof MenuLinkList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
};
