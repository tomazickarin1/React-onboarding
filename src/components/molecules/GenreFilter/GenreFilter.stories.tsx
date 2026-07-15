import type { Meta, StoryObj } from "@storybook/react-vite";
import GenreFilterComponent from "./GenreFilter";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/GenreFilter",
  component: GenreFilterComponent,
} satisfies Meta<typeof GenreFilterComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
];

export const Default: Story = {
  args: {
    genre: genres,
    selectedGenres: [2],
    setSelectedGenres: fn(),
  },
};

export const Loading: Story = {
  args: {
    genre: undefined,
    selectedGenres: [],
    setSelectedGenres: fn(),
  },
};
