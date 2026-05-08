import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.scss";
import HomePage from "./components/pages/HomePage/HomePage";
import SearchPage from "./components/pages/SearchPage/SearchPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.movieapp}>
        <HomePage />
        <SearchPage/>
      </div>
    </QueryClientProvider>
  );
}
