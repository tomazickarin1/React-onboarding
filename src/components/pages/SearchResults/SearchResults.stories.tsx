import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchResultsComponent from "./SearchResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { mockResults, TMDB_SEARCH_URL_TV } from "../../../mock/search";

const meta = {
  title: "Component/pages/SearchResults",
  component: SearchResultsComponent,
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
} satisfies Meta<typeof SearchResultsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchResults: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_TV, () =>
          HttpResponse.json({ results: mockResults, total_pages: 3 }),
        ),
      ],
    },
  },
};
