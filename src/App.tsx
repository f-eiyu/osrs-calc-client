import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/shared/Header";
import CalcMain from "./components/calc/CalcMain";
import Footer from "./components/shared/Footer";

import './App.css';

import { getItemDb, getNpcDb } from "./api/calc";

function App() {

  // data states -- setters should not be called except upon initial load
  const [itemList, setItemList] = useState([]);
  const [npcList, setNpcList] = useState([]);
  
  useEffect(() => {
    getItemDb()
      .then(data => console.log(data.data))

    getNpcDb()
      .then(data => console.log(data.data))
  }, []);

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
