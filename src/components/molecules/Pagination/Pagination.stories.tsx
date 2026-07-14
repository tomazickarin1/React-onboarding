import type { Meta, StoryObj } from "@storybook/react-vite";
import PaginationComponent from "./Pagination";

const meta = {
  title: "Component/molecules/Pagination",
  component: PaginationComponent,
} satisfies Meta<typeof PaginationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
  },
};
