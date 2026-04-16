import type { Meta, StoryObj } from "@storybook/react-vite";

import MainMenuLinkComponent from "./MainMenuLink";

const meta = {
  title: "Component/atoms/MainMenuLink",
  component: MainMenuLinkComponent,
} satisfies Meta<typeof MainMenuLinkComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainMenuLink: Story = {
  args: {
    label: "MainMenuLink text",
    url: '#',
    handleMenuToggle: () => {},
  },
};
