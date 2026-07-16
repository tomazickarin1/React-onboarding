import type { Meta, StoryObj } from "@storybook/react-vite";
import DesktopNavComponent from "./DesktopNav";

const meta = {
  title: "Component/organisms/DesktopNav",
  component: DesktopNavComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DesktopNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopNav: Story = {
  globals: {
    viewport: { value: "desktop" },
  },
};
