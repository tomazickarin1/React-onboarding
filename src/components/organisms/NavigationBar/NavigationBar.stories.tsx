import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationBarComponent from "./NavigationBar";

const meta = {
  title: "Component/organisms/NavigationBar",
  component: NavigationBarComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavigationBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: {
    viewport: { value: "desktop" },
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1" },
  },
};
