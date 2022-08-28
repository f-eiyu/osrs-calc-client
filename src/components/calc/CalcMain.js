import { useState } from "react";

import CalcTop from "./CalcTop";
import CalcBottom from "./CalcBottom";

import "./calc.css";

const CalcMain = (props) => {
  const slotNames = Object.keys(props.itemList);
  const defaultSlots = {};
  defaultSlots.style = "crush";
  slotNames.forEach(slot => defaultSlots[slot] = "None");

  const [loadoutLeft, setLoadoutLeft] = useState({ ...defaultSlots });
  const [loadoutRight, setLoadoutRight] = useState({ ...defaultSlots });

  // 1 = left, 2 = right
  const setLoadout = (loadoutNum, loadout) => {
    if (loadoutNum === 1) { setLoadoutLeft(loadout); }
    else { setLoadoutRight(loadout); }
  }

  return (
    <div id="calc-body">
      <CalcTop
        itemList={props.itemList}
        npcList={props.npcList}
        loadoutLeft={loadoutLeft}
        loadoutRight={loadoutRight}
      />
      <CalcBottom
        itemList={props.itemList}
        loadoutLeft={loadoutLeft}
        loadoutRight={loadoutRight}
        setLoadout={setLoadout}
      />
    </div>
  )
}

export default CalcMain;