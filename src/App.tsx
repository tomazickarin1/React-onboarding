import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.scss";
import HomePage from "./components/pages/HomePage/HomePage";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import { Routes, Route } from "react-router";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.movieapp}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
