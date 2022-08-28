import { useState, useEffect } from "react";

import NpcSelect from "./panels/top/NpcSelect";

const CalcTop = (props) => {
  const { npcList } = props;

  const [currentNpcIndex, setCurrentNpcIndex] = useState(0);
  const [currentNpc, setCurrentNpc] = useState(null);

  console.log(npcList);

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
      <div>player stats</div>
      <div>results!</div>
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