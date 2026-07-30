/// <reference path="../src/declarations.d.ts" />
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/styles/global.scss";
import { MemoryRouter, useLocation } from "react-router";
import { useEffect } from "react";
import { action } from "storybook/actions";

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

// logs every navigation in actions tab
function RouteActionLogger() {
  // the current path and query string
  // - changes when link click navigates somewhere else
  const location = useLocation();

  useEffect(() => {
    action("navigated")(location.pathname + location.search);

  }, [location]);

  return null;
}

const preview: Preview = {
  decorators: [
    (Story, context) => (

      // give each story unique id - forces react to build a new router each time
      // you switch stories.

      <MemoryRouter
        key={context.id}
        initialEntries={context.parameters.routeEntries ?? ["/"]}
      >
        <RouteActionLogger />
        <Story />
      </MemoryRouter>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
  loaders: [mswLoader],
};

export default preview;
