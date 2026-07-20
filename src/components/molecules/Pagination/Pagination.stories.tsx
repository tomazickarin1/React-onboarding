import type { Meta, StoryObj } from "@storybook/react-vite";
import PaginationComponent from "./Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { action } from "storybook/actions";

function PageActionLogger() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    action("page-changed")(searchParams.get("page") ?? "1");
  }, [searchParams]);
  return null;
}

const meta = {
  title: "Component/molecules/Pagination",
  component: PaginationComponent,
  decorators: [
    (Story) => (
      <>
        <PageActionLogger />
        <Story />
      </>
    ),
  ],
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
