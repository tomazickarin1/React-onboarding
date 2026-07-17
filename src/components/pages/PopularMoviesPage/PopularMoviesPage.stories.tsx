import type { Meta, StoryObj } from "@storybook/react-vite";
import PopularMoviesPageComponent from "./PopularMoviesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { PopularMoviesProvider } from "../../../store/PopularMoviesContext";
import { mockMovies, mockGenres } from "../../../mock/mockData";

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
