import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchResultsComponent from "./SearchResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
import {
  mockTV,
  mockMovies,
  mockPeople,
  mockSimpleItems,
  TMDB_SEARCH_URL_TV,
  TMDB_SEARCH_URL_MOVIE,
  TMDB_SEARCH_URL_PERSON,
  TMDB_SEARCH_URL_SIMPLE,
} from "../../../mock/mockData";
import { Routes, Route } from "react-router";

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
  render: (args) => (
    <Routes>
      <Route
        path=":filter"
        element={<SearchResultsComponent {...args} />}
      ></Route>
    </Routes>
  ),
} satisfies Meta<typeof SearchResultsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TvShow: Story = {
  parameters: {
    routeEntries: ["/tv"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_TV, () =>
          HttpResponse.json({ results: mockTV, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Movie: Story = {
  parameters: {
    routeEntries: ["/movie"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: mockMovies, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Person: Story = {
  parameters: {
    routeEntries: ["/person"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_PERSON, () =>
          HttpResponse.json({ results: mockPeople, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Simple: Story = {
  parameters: {
    routeEntries: ["/keyword"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_SIMPLE, () =>
          HttpResponse.json({ results: mockSimpleItems, total_pages: 1 }),
        ),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    routeEntries: ["/movie"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, async () => {
          await delay("infinite");
          return HttpResponse.json({ results: mockMovies, total_pages: 3 });
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    routeEntries: ["/movie"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () => {
          return HttpResponse.json(
            { status_message: "Invalid API key" },
            { status: 401 },
          );
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    routeEntries: ["/movie"],
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: [], total_pages: 0 }),
        ),
      ],
    },
  },
};

