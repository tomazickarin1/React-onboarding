import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TabsComponent from "./Tabs";

const meta = {
  title: "Component/molecules/Tabs",
  component: TabsComponent,
} satisfies Meta<typeof TabsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tabs: Story = {
  args: {
    tabs: [
      { id: 1, label: "Streaming" },
      { id: 2, label: "On TV" },
      { id: 3, label: "For Rent" },
      { id: 4, label: "In Theatres" },
    ],
    activeTab: 1,
    onTabChange: fn(),
    ref: { current: null },
  },
};
