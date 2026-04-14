import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "./Card";

const meta = {
  title: "Component/atoms/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: "imageurl",
    title: "movie title",
    date: "12.4.2026",
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    image: "imageurl",
    title: "movie title",
    date: "12.4.2026",
    isLoading: true,
  },
};

