import type { Meta, StoryObj } from "@storybook/react-vite";
import MainMenuComponent from "./MainMenu";

const meta = {
  title: "Component/organisms/MainMenu",
  component: MainMenuComponent,
} satisfies Meta<typeof MainMenuComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainMenu: Story = {};
