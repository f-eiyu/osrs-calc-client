import { useState, useEffect } from 'react';

import TextField from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const NpcSelect = (props) => {
  const { npcList } = props;
  // eslint-disable-next-line
  const { currentNpcIndex, setCurrentNpcIndex, currentNpc } = props;

  const npcOptions = npcList.map(npc => `${npc.name} (${npc.combat_level})`);

  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    if (currentNpc) { setCurrentName(currentNpc.name); }
  }, [currentNpc]);

  const handleFocus = (event) => {
    event.target.select();
  }

  const handleChange = (event) => {
    const npcNameRaw = event;
    const npcIndex = npcOptions.indexOf(npcNameRaw);

    if (npcIndex !== -1) { setCurrentNpcIndex(npcIndex); }

    setCurrentName(npcNameRaw);
  }

  return (
    <div>
      <h2>Monster Settings</h2>
      <TextField
        Component="input"
        type="text"
        matchAny={true}
        trigger=""
        regex="^[a-zA-Z0-9_\-' ]+$"
        spacer=""
        maxOptions={10}
        options={npcOptions}
        value={currentName}
        onFocus={handleFocus}
        onChange={(event) => handleChange(event)}
        style={{width: "14em"}}
        placeholder="Enter a monster's name..."
      />
      <div>HP: {currentNpc.hitpoints}</div>
      <div>Defence: {currentNpc.defence_level}</div>
      <div>Magic: {currentNpc.magic_level}</div>
      <div>Defence bonuses:
        <ul style={{listStyleType: "none", margin: 0, padding: 0}}>
          <li>Slash: {currentNpc.defence_slash}</li>
          <li>Stab: {currentNpc.defence_stab}</li>
          <li>Crush: {currentNpc.defence_crush}</li>
          <li>Ranged: {currentNpc.defence_ranged}</li>
          <li>Magic: {currentNpc.defence_magic}</li>
        </ul>
      </div>

    </div>
  );
}

export default NpcSelect;