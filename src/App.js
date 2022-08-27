import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/shared/Header";
import CalcMain from "./components/calc/CalcMain";
import Footer from "./components/shared/Footer";

import './App.css';

import { getItemDb, getNpcDb } from "./api/calc";

function App() {

  // data states -- setters should not be called except upon initial load
  const [itemList, setItemList] = useState({});
  const [npcList, setNpcList] = useState([]);
  
  useEffect(() => {
    getItemDb()
      .then(itemDataRaw => {
        // sort the raw data into slots
        const itemDataSlotSorted = {};
        for (const item of itemDataRaw.data) {
          if (itemDataSlotSorted[item.slot]) {
            itemDataSlotSorted[item.slot].push(item);
          } else {
            itemDataSlotSorted[item.slot] = [item];
          }
        }

        setItemList(itemDataSlotSorted);
      });

    getNpcDb()
      .then(npcData => setNpcList(npcData.data));
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={<CalcMain
            itemList={itemList} npcList={npcList}
          />}
        />

        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
