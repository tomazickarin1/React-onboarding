import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Input from "./Input";

const meta = {
  title: "Component/atoms/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
    onChange: fn(),
  },
};
