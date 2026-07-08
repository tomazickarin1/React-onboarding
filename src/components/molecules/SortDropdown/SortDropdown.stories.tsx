import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import SortDropdownComponent from "./SortDropdown";

const meta = {
  title: "Component/molecules/SortDropdown",
  component: SortDropdownComponent,
} satisfies Meta<typeof SortDropdownComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SortDropdown: Story = {
  args: {
    sortBy: { value: "popularity.desc", label: "Popularity Descending" },
    setSortBy: fn(),
  },
};
