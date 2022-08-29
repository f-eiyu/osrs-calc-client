import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "./components/shared/Loading";
import Header from "./components/shared/Header";
import CalcMain from "./components/calc/CalcMain";
import Footer from "./components/shared/Footer";

import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import SignUp from "./components/auth/SignUp";
import Settings from "./components/user/Settings"

import './App.css';

import { getItemDb, getNpcDb } from "./api/calc";

function App() {
  // data states -- setters should never be called except upon initial load
  const [itemList, setItemList] = useState(null);
  const [npcList, setNpcList] = useState(null);
  
  useEffect(() => {
    // fill itemList locally using the item db
    getItemDb()
      .then(itemData => {setItemList(itemData.data)});

    // fill npcList locally using the npc db
    getNpcDb()
      .then(npcData => setNpcList(npcData.data));
  }, []);

  if (!itemList || !npcList) { return <Loading />}
  
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

        <Route
          path="/sign-in"
          element={<SignIn />}
        />
        <Route
          path="/sign-out"
          element={<SignOut />}
        />
        <Route
          path="/sign-up"
          element={<SignUp />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
