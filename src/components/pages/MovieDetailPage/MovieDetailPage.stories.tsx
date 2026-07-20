import type { Meta, StoryObj } from "@storybook/react-vite";
import MovieDetailPageComponent from "./MovieDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { Routes, Route } from "react-router";

const meta = {
  title: "Component/pages/MovieDetailPage",
  component: MovieDetailPageComponent,
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
  render: () => (
    <Routes>
      <Route path="/movie/:id" element={<MovieDetailPageComponent />}></Route>
    </Routes>
  ),
} satisfies Meta<typeof MovieDetailPageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMovieDetails = {
  id: 3,
  overview:
    "A group of astronauts travel through a wormhole in search of a new home for humanity.",
  title: "Interstellar",
  genres: [
    { id: 12, name: "Adventure" },
    { id: 18, name: "Drama" },
  ],
  release_date: "2014-11-07",
  poster_path: null,
  backdrop_path: null,
  tagline: "Mankind was born on Earth. It was never meant to die here.",
  runtime: 169,
  credits: {
    crew: [{ id: 1, name: "Christopher Nolan", job: "Director" }],
  },
  vote_average: 8.7,
};

export const MovieDetailPage: Story = {
  parameters: {
    routeEntries: ["/movie/3"],
    msw: {
      handlers: [
        http.get("https://api.themoviedb.org/3/movie/3", () =>
          HttpResponse.json(mockMovieDetails),
        ),
      ],
    },
  },
};
