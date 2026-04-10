import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import SingleColumn from "./SingleColumn";

const meta = {
  title: "Component/templates/SingleColumn",
  component: SingleColumn,
} satisfies Meta<typeof SingleColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Page content goes here</p>,
  },
};
