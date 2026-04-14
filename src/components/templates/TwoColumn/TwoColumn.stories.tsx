
import type { Meta, StoryObj } from "@storybook/react-vite";
import TwoColumn from "./TwoColumn";

const meta = {
  title: "Component/templates/TwoColumn",
  component: TwoColumn,
} satisfies Meta<typeof TwoColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    main: <p>Main content</p>,
    sidebar: <p>Sidebar content</p>,
  },
};
