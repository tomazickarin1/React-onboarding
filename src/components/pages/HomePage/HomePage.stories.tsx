import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePageComponent from "./HomePage";
import { mockMovies, TMDB_POPULAR_URL } from "../../../mock/movies";

const meta = {
  title: "Component/pages/HomePage",
  component: HomePageComponent,
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
} satisfies Meta<typeof HomePageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
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
