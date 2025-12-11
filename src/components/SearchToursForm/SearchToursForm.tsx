import { useSearchStore } from "@/store";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDestination) {
      alert("Будь ласка, оберіть напрямок");
      return;
    }

    console.log("Search:", { destination: selectedDestination });
    // TODO: trigger search (Завдання 2)
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
        disabled={!selectedDestination}
        variant="primary"
        size="medium"
      >
        Знайти
      </Button>
    </form>
  );
};

export default SearchToursForm;
