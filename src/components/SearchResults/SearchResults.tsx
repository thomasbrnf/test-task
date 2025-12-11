import { useSearch } from "@/hooks";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";

import "./SearchResults.scss";

const SearchResults = () => {
  const { isIdle, isLoading, isError, isEmpty, isSuccess, error, results } =
    useSearch();

  if (isIdle) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="search-results">
        <Loader text="Шукаємо тури..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="search-results">
        <ErrorMessage message={error || "Помилка пошуку"} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="search-results">
        <EmptyState />
      </div>
    );
  }

   if (isSuccess) {
    console.log({results})
    return (
      <div className="search-results">
        {/* TODO: Завдання 3 - TourCard components */}
      </div>
    );
  }

  return null;
};

export default SearchResults;