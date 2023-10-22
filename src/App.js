import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SuperheroList from "./components/SuperheroList";
import SuperheroDetail from "./components/SuperheroDetail";
import EditSuperhero from "./components/EditSuperhero";
import { SuperheroProvider } from "./middlware/SuperheroContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <SuperheroProvider>
          <Routes>
            <Route path="/superheroes" element={<SuperheroList />} />
            <Route path="/superheroes/:id" element={<SuperheroDetail />} />
            <Route path="/superheroes/:id/edit" element={<EditSuperhero />} />
            <Route path="/superheroes/add" element={<EditSuperhero />} />
          </Routes>
        </SuperheroProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
