import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Component/atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click me",
    onClick: fn(),
  },
};

export const Language: Story = {
  args: {
    label: "EN",
    variant: "language",
    onClick: fn(),
  },
};

export const Reset: Story = {
  args: {
    label: "Reset",
    variant: "reset",
    onClick: fn(),
  },
};
