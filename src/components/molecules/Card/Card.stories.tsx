import type { Meta, StoryObj } from "@storybook/react-vite";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg";
import { cardLabels } from "../../../data/labels";

import CardComponent from "./Card";

const meta = {
  title: "Component/molecules/Card",
  component: CardComponent,
} satisfies Meta<typeof CardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowcaseCard: Story = {
  args: {
    image: pladeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "showcase",
    id: "2",
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};

export const PopularCard: Story = {
  args: {
    image: pladeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "popular",
    id: "1",
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};
