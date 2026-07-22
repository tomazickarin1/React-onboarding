import type { Meta, StoryObj } from "@storybook/react-vite";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg";

import CardComponent from "./Card";

const meta = {
  title: "Component/molecules/Card",
  component: CardComponent,
} satisfies Meta<typeof CardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowcaseCard: Story = {
  args: {
    image: pladeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "showcase",
    id: "2",
  },
};

export const PopularCard: Story = {
  args: {
    image: pladeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "popular",
    id: "1",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};
