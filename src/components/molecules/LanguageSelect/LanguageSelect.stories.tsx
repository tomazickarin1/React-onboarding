import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import LanguageSelect from "./LanguageSelect";

const meta = {
  title: "Component/molecules/LanguageSelect",
  component: LanguageSelect,
} satisfies Meta<typeof LanguageSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    languageList: [
      { code: "en", label: "English" },
      { code: "fr", label: "French" },
      { code: "de", label: "German" },
    ],
    selected: "en",
    type: "primary",
    onSelect: fn(),
  },
};
