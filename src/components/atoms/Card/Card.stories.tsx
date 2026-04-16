import type { Meta, StoryObj } from "@storybook/react-vite";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg"

import CardComponent from "./Card";

const meta = {
  title: "Component/atoms/Card",
  component: CardComponent,
} satisfies Meta<typeof CardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    image: pladeholderPoster,
    title: "movie title",
    date: "12.4.2026",
    isLoading: false,
  },
};

