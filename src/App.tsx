import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        {/* TODO: Завдання 4 - Tour page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
