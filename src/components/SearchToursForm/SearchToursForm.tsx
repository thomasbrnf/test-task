import { useSearchStore } from "@/store";
import { useSearch } from "@/hooks";
import Button from "../ui/Button";
import GeoSearchInput from "../GeoSearchInput";

import "./SearchToursForm.scss";

const SearchToursForm = () => {
  const {
    destination,
    setDestination,
    selectedDestination,
    setSelectedDestination,
  } = useSearchStore();

  const { search, isLoading } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDestination) {
      return;
    }

    search();
  };

  return (
    <form className="search-tours-form" onSubmit={handleSubmit}>
      <h1 className="search-tours-form__title">Форма пошуку турів</h1>
      <div className="search-tours-form__fields">
        <GeoSearchInput
          value={destination}
          onChange={setDestination}
          onSelect={setSelectedDestination}
          selectedEntity={selectedDestination}
          placeholder="Куди хочете поїхати?"
        />
      </div>

      <Button
        type="submit"
        disabled={!selectedDestination || isLoading}
        variant="primary"
        size="medium"
      >
        {isLoading ? "Пошук..." : "Знайти"}
      </Button>
    </form>
  );
};

export default SearchToursForm;
