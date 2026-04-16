import type { Meta, StoryObj } from "@storybook/react-vite";

import AppComponent from "./App";

const meta = {
  title: "Component/App",
  component: AppComponent,
} satisfies Meta<typeof AppComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const App: Story = {
  args: {
    text: "App text",
  },
};