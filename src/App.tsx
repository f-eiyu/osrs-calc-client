import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/shared/Header";
import CalcMain from "./components/calc/CalcMain";
import Footer from "./components/shared/Footer";

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={<CalcMain />}
        />

        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
