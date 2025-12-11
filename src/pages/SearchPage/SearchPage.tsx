import SearchToursForm from "../../components/SearchToursForm";

import "./SearchPage.scss";

const SearchPage = () => {
  return (
    <div className="search-page">
      <div className="search-page__container">
        <SearchToursForm />
      </div>
    </div>
  );
};

export default SearchPage;
