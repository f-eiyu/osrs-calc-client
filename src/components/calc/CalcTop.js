import { useState, useEffect } from "react";

import PlayerSelect from "./panels/top/PlayerSelect";
import Results from "./panels/top/Results";
import NpcSelect from "./panels/top/NpcSelect";

const defaultPlayer = {
  name: "",
  attack: 99,
  strength: 99,
  defence: 99,
  ranged: 99,
  magic: 99,
  hitpoints: 99,
  prayer: 99,
  mining: 99,
  boosts: {
    attack: "None",
    strength: "None",
    ranged: "None",
    magic: "None"
  },
  prayers: {
    attack: "None",
    strength: "None",
    ranged: "None",
    magic: "None"
  }
}

const CalcTop = (props) => {
  const { itemList, npcList, loadoutLeft, loadoutRight } = props;

  const [currentNpcIndex, setCurrentNpcIndex] = useState(0);
  const [currentNpc, setCurrentNpc] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(defaultPlayer);

  // set the default monster to be a cow
  useEffect(() => {
    const npcNames = npcList.map(npc => npc.name);
    const cowIndex = npcNames.indexOf("Cow");
    setCurrentNpcIndex(cowIndex);
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentNpc(npcList[currentNpcIndex]);
  // eslint-disable-next-line
  }, [currentNpcIndex])

  if (!currentNpcIndex || !currentNpc) { return <></>; }

  return (
    <div id="calc-top">
      <PlayerSelect
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />

      <Results
        itemList={itemList}
        loadoutLeft={loadoutLeft}
        loadoutRight={loadoutRight}
        npc={currentNpc}
        player={currentPlayer}
      />

      <NpcSelect
        npcList={npcList}
        currentNpcIndex={currentNpcIndex}
        setCurrentNpcIndex={setCurrentNpcIndex}
        currentNpc={currentNpc}
      />
    </div>
  )
}

export default CalcTop;