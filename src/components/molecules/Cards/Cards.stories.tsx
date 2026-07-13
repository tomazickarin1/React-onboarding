import type { Meta, StoryObj } from "@storybook/react-vite";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg";

import CardsComponent from "./Cards";

const meta = {
  title: "Component/molecules/Cards",
  component: CardsComponent,
} satisfies Meta<typeof CardsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  args: {
    movies: [
      { id: 1, title: "Streaming", url: pladeholderPoster, date: "2026-03-01" },
      { id: 2, title: "On TV", url: pladeholderPoster, date: "2026-03-01" },
      { id: 3, title: "For Rent", url: pladeholderPoster, date: "2026-03-01" },
      {
        id: 4,
        title: "In Theatres",
        url: pladeholderPoster,
        date: "2026-03-01",
      },
      {
        id: 5,
        title: "In Theatres",
        url: pladeholderPoster,
        date: "2026-03-01",
      },
      {
        id: 6,
        title: "In Theatres",
        url: pladeholderPoster,
        date: "2026-03-01",
      },
      {
        id: 7,
        title: "In Theatres",
        url: pladeholderPoster,
        date: "2026-03-01",
      },
      {
        id: 8,
        title: "In Theatres",
        url: pladeholderPoster,
        date: "2026-03-01",
      },
    ],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    movies: [],
    isLoading: true,
  },
};
