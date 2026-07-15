import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationBarComponent from "./NavigationBar";

const meta = {
  title: "Component/organisms/NavigationBar",
  component: NavigationBarComponent,
} satisfies Meta<typeof NavigationBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationBar: Story = {};
