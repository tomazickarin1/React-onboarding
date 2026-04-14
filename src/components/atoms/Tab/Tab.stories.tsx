import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Tab from "./Tab";

const meta = {
  title: "Component/atoms/Tab",
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Streaming",
    isActive: true,
    onClick: fn(),
  },
};

export const Inactive: Story = {
  args: {
    label: "Streaming",
    isActive: false,
    onClick: fn(),
  },
};
