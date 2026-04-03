import type { Meta, StoryObj } from "@storybook/react-vite";
import LanguageSwitcherHandler from "./LanguageSwitcherHandler";
import { expect } from "storybook/test";

const meta = {
  title: "Component/LanguageSwitcher",
  component: LanguageSwitcherHandler,
} satisfies Meta<typeof LanguageSwitcherHandler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClickOutsideClosesPickBox: Story = {
  play: async ({ canvas, userEvent }) => {
    // open the pick box
    const langButton = canvas.getByRole("button", { name: /language settings/i })
    await userEvent.click(langButton);

    await expect(canvas.getByRole("group", { name: /language preferences/i })).toBeVisible();

    // click outside
    await userEvent.click(document.body);

    await expect(canvas.queryByRole("group", { name: /language preferences/i })).not.toBeInTheDocument();
  },
};
