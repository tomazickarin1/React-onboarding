import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import LanguageSelectComponent from "./LanguageSelect";

const meta = {
  title: "Component/molecules/LanguageSelect",
  component: LanguageSelectComponent,
} satisfies Meta<typeof LanguageSelectComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LanguageSelect: Story = {
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
