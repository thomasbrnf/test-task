import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

import "./App.scss";
import TourPage from "./pages/TourPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/tour/:tourId/:hotelId" element={<TourPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
