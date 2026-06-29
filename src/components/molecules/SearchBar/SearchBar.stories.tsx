import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchBar from "./SearchBar";

const meta = {
  title: "Component/molecules/SearchBar",
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
