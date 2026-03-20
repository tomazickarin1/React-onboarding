import type { Meta, StoryObj } from "@storybook/react-vite";

import MainMenuItem from "./MainMenuItem";

const meta = {
  title: "Component/MainMenuItem",
  component: MainMenuItem,
} satisfies Meta<typeof MainMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "MainMenuItem text",
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
};
