import { useState } from "react";

import CalcTop from "./CalcTop";
import CalcBottom from "./CalcBottom";

import getDefaultLoadout from "./utils/getDefaultLoadout";

import "./calc.css";

const CalcMain = (props) => {
  const { user, setUser } = props;

  const defaultLoadout = getDefaultLoadout(props.itemList);

  const [loadoutLeft, setLoadoutLeft] = useState({ ...defaultLoadout });
  const [loadoutRight, setLoadoutRight] = useState({ ...defaultLoadout });

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
        setLoadoutLeft={setLoadoutLeft}
        setLoadoutRight={setLoadoutRight}
        user={user}
        setUser={setUser}
      />
    </div>
  )
}

export default CalcMain;