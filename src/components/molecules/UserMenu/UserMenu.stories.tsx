import type { Meta, StoryObj } from "@storybook/react-vite";
import UserMenu from "./UserMenu";

const meta = {
  title: "Component/molecules/UserMenu",
  component: UserMenu,
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /user menu/i });
    await userEvent.click(button);
  },
};
