import { useQuery } from "@tanstack/react-query";
import Showcase from "../Showcase/Showcase";
import { useState } from "react";
import { useRef } from "react";
import { useFetchShowcaseData } from "../../../hooks/useFetchShowcaseData";

type Movie = { id: number; url: string; title: string; date: string };

export default function ShowcaseQueryFetch() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["showcase-movies"],
    queryFn: useFetchShowcaseData,
  });

  const [activeTab, setActiveTab] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
    );
  }

  const tabMovies: Record<number, Movie[] | undefined> = {
    1: data?.streaming,
    2: data?.rent,
    3: data?.theater,
  };

  const movies = tabMovies[activeTab] ?? [];

  return (
    <Showcase
      movies={movies}
      isLoading={isLoading}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      ref={wrapperRef}
    />
  );
}
