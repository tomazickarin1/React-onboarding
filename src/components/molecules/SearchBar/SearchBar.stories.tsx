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

export const Default: Story = {
  args: {
    query: "",
    onSubmit: fn(),
    onQueryChange: fn(),
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
