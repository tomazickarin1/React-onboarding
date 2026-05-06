import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.scss";
import HomePage from "./components/pages/HomePage/HomePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.movieapp}>
        <HomePage />
      </div>
    </QueryClientProvider>
  );
}
