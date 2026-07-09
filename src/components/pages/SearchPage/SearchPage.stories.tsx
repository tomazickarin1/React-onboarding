import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPageComponent from "./SearchPage";
import { mockMovies, TMDB_SEARCH_URL } from "../../../mock/movies";

const meta = {
  title: "Component/pages/SearchPage",
  component: SearchPageComponent,
  parameters: {
    layout: "fullscreen",
  },
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
} satisfies Meta<typeof SearchPageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchPage: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL, () =>
          HttpResponse.json({ results: mockMovies, total_pages: 5 }),
        ),
      ],
    },
  },
};
