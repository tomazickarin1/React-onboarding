import type { Meta, StoryObj } from "@storybook/react-vite";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg";
import { fn } from "storybook/test";

import ShowcaseComponent from "./Showcase";

const meta = {
  title: "Component/organisms/Showcase",
  component: ShowcaseComponent,
} satisfies Meta<typeof ShowcaseComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Showcase: Story = {
  args: {
    movies: [
      { id: 1, title: "Streaming", url: pladeholderPoster, date: "nov 15" },
      { id: 2, title: "On TV", url: pladeholderPoster, date: "nov 15" },
      { id: 3, title: "For Rent", url: pladeholderPoster, date: "nov 15" },
      { id: 4, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 5, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 6, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 7, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 8, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 9, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 10, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 11, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
      { id: 12, title: "In Theatres", url: pladeholderPoster, date: "nov 15" },
    ],
    isLoading: false,
    activeTab: 1,
    ref: { current: null },
    onTabChange: fn(),
  },
};
