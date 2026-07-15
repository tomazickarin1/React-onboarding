import type { Meta, StoryObj } from "@storybook/react-vite";
import MobileNavComponent from "./MobileNav";

const meta = {
  title: "Component/organisms/MobileNav",
  component: MobileNavComponent,
} satisfies Meta<typeof MobileNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobileNav: Story = {
  args: {
    homeAriaLabel: "test",
    openMenuAriaLabel: "test",
  },
};
