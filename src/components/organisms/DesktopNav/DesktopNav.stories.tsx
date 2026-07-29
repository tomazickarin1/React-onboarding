import type { Meta, StoryObj } from "@storybook/react-vite";
import { desktopNavLabels } from "../../../data/labels";
import DesktopNavComponent from "./DesktopNav";

const meta = {
  title: "Component/organisms/DesktopNav",
  component: DesktopNavComponent,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof DesktopNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopNav: Story = {
  args: {
    homeAriaLabel: desktopNavLabels.homeAriaLabel,
    createAriaLabel: desktopNavLabels.createAriaLabel,
    loginLinkLabel: desktopNavLabels.loginLink,
    joinLinkLabel: desktopNavLabels.joinLink,
  },
  globals: {
    viewport: { value: "desktop" },
  },
};
