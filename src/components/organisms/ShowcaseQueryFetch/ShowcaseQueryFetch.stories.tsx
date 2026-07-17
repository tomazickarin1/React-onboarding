import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockMovies, TMDB_POPULAR_URL } from "../../../mock/mockData";
import ShowcaseQueryFetch from "./ShowcaseQueryFetch";

const meta = {
  title: "Component/organisms/ShowcaseQueryFetch",
  component: ShowcaseQueryFetch,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof ShowcaseQueryFetch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_POPULAR_URL, () =>
          HttpResponse.json({ results: mockMovies }),
        ),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_POPULAR_URL, () =>
          HttpResponse.json(
            { status_message: "Invalid API key" },
            { status: 401 },
          ),
        ),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_POPULAR_URL, () => HttpResponse.json({ results: [] })),
      ],
    },
  },
};
