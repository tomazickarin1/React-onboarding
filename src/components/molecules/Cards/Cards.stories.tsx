import type { Meta, StoryObj } from "@storybook/react-vite";
import Cards from "./Cards";

const meta = {
  title: "Component/molecules/Cards",
  component: Cards,
} satisfies Meta<typeof Cards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movies: [
      { id: 1, title: "Streaming", url: "/", date: "nov 15" },
      { id: 2, title: "On TV", url: "/", date: "nov 15" },
      { id: 3, title: "For Rent", url: "/", date: "nov 15" },
      { id: 4, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 5, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 6, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 7, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 8, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 9, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 10, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 11, title: "In Theatres", url: "/", date: "nov 15" },
      { id: 12, title: "In Theatres", url: "/", date: "nov 15" },
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