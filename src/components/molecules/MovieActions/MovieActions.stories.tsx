import type { Meta, StoryObj } from "@storybook/react-vite";
import MovieActionsComponent from "./MovieActions";

const meta = {
  title: "Component/molecules/MovieActions",
  component: MovieActionsComponent,
} satisfies Meta<typeof MovieActionsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieActions: Story = {};
