import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import SearchBar from "./SearchBar";

const meta = {
  title: "Component/molecules/SearchBar",
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const topTenMovies = [
  { title: "Masters of the Universe", id: 454639 },
  { title: "Disclosure Day", id: 127 },
  { title: "Disclosure Day", id: 1275779 },
  { title: "The Odyssey", id: 1368337 },
  { title: "Elize: Shadows of a Woman", id: 1487861 },
];

export const Default: Story = {
  args: {
    query: "",
    onSubmit: fn(),
    onQueryChange: fn(),
    topTenMovies: topTenMovies,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <SearchBar
        {...args}
        onQueryChange={(value) => {
          args.onQueryChange(value);
          updateArgs({ query: value });
        }}
      />
    );
  },
};
