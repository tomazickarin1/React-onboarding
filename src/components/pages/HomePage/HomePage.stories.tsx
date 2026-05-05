import type { Meta, StoryObj } from "@storybook/react-vite";

import HomePageComponent from "./HomePage";

const meta = {
  title: "Component/pages/HomePage",
  component: HomePageComponent,
} satisfies Meta<typeof HomePageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomePage: Story = {};
