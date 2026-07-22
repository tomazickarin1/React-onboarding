import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import AppComponent from "./App";
import {
  mockMovies,
  TMDB_DISCOVER_URL_MOVIE,
  TMDB_DISCOVER_URL_NOW_PLAYING,
} from "./mock/mockData";

const meta = {
  title: "Component/App",
  component: AppComponent,
} satisfies Meta<typeof AppComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const App: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_DISCOVER_URL_MOVIE, () =>
          HttpResponse.json({ results: mockMovies }),
        ),
        http.get(TMDB_DISCOVER_URL_NOW_PLAYING, () =>
          HttpResponse.json({ results: mockMovies }),
        ),
      ],
    },
  },
};
