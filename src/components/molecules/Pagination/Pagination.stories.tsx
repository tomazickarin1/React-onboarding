import type { Meta, StoryObj } from "@storybook/react-vite";
import PaginationComponent from "./Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";

function PageSync({
  updateArgs,
}: {
  updateArgs: (args: { page: number }) => void;
}) {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = Number(searchParams.get("page") ?? "1");
    action("page-changed")(page);
    updateArgs({ page });
  }, [searchParams, updateArgs]);

  return null;
}

const meta = {
  title: "Component/molecules/Pagination",
  component: PaginationComponent,
  decorators: [
    (Story) => {
      const [, updateArgs] = useArgs();

      return (
        <>
          <PageSync updateArgs={updateArgs} />
          <Story />
        </>
      );
    },
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
