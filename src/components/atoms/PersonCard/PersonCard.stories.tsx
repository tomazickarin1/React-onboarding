import type { Meta, StoryObj } from "@storybook/react-vite";
import PersonCardComponent from "./PersonCard";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg";

const meta = {
  title: "Component/atoms/PersonCard",
  component: PersonCardComponent,
} satisfies Meta<typeof PersonCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PersonCard: Story = {
  args: {
    name: "Anna Smith",
    department: "Directing",
    profileImg: "",
  },
};

export const PersonCardWithImg: Story = {
  args: {
    name: "Anna Smith",
    department: "Acting",
    profileImg: pladeholderPoster,
  },
};
