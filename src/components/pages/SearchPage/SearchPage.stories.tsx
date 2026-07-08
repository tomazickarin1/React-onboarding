import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPageComponent from "./SearchPage";

const TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

const mockMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster_path: null,
    release_date: "2024-03-01",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster_path: null,
    release_date: "2023-07-21",
  },
  { id: 3, title: "The Batman", poster_path: null, release_date: "2022-03-04" },
  {
    id: 4,
    title: "Interstellar",
    poster_path: null,
    release_date: "2014-11-07",
  },
  { id: 5, title: "Inception", poster_path: null, release_date: "2010-07-16" },
  { id: 6, title: "Tenet", poster_path: null, release_date: "2020-08-26" },
  { id: 7, title: "Dunkirk", poster_path: null, release_date: "2017-07-21" },
  {
    id: 8,
    title: "The Prestige",
    poster_path: null,
    release_date: "2006-10-20",
  },
];

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
