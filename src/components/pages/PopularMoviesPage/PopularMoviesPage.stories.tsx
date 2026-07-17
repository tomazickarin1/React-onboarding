import type { Meta, StoryObj } from "@storybook/react-vite";
import PopularMoviesPageComponent from "./PopularMoviesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { PopularMoviesProvider } from "../../../store/PopularMoviesContext";

const meta = {
  title: "Component/pages/PopularMoviesPage",
  component: PopularMoviesPageComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <PopularMoviesProvider>
            <Story />
          </PopularMoviesProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof PopularMoviesPageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  {
    id: 3,
    title: "Dune: Part Two",
    poster_path: null,
    release_date: "2024-03-01",
  },
  {
    id: 4,
    title: "Oppenheimer",
    poster_path: null,
    release_date: "2023-07-21",
  },
  {
    id: 5,
    title: "Dune: Part Two",
    poster_path: null,
    release_date: "2024-03-01",
  },
];

const mockGenres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
];

export const PopularMoviesPage: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.themoviedb.org/3/discover/movie", () =>
          HttpResponse.json({ results: mockMovies }),
        ),
        http.get("https://api.themoviedb.org/3/genre/movie/list", () =>
          HttpResponse.json({ genres: mockGenres }),
        ),
      ],
    },
  },
};
