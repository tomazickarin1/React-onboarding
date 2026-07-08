import type { Meta, StoryObj } from "@storybook/react-vite";
import IconButtonComponent from "./IconButton";

import { faList, faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";

const meta = {
  title: "Component/atoms/IconButton",
  component: IconButtonComponent,
} satisfies Meta<typeof IconButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {
    icon: faList,
  },
};

export const Heart: Story = {
  args: {
    icon: faHeart,
  },
};

export const Bookmark: Story = {
  args: {
    icon: faBookmark,
  },
};
