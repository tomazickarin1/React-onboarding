
import type { Meta, StoryObj } from "@storybook/react-vite";
import TwoColumnComponent from "./TwoColumn";

const meta = {
  title: "Component/templates/TwoColumn",
  component: TwoColumnComponent,
} satisfies Meta<typeof TwoColumnComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumn: Story = {
  args: {
    main: <p>Main content</p>,
    sidebar: <p>Sidebar content</p>,
  },
};
