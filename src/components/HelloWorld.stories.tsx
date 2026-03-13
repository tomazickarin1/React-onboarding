import type { Meta, StoryObj } from "@storybook/react-vite";

import HelloWorld from "./HelloWorld";

const meta = {
  title: "Component/HelloWord",
  component: HelloWorld,
} satisfies Meta<typeof HelloWorld>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Hello Word",
  },
};