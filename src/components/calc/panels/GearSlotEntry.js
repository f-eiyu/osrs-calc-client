import { useState } from 'react';

import TextField from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const GearSlotEntry = (props) => {
  const { slot, boxNum, items, loadout, setLoadout } = props;
  const [currentName, setCurrentName] = useState("None");
  const itemNames = Object.keys(items);

  const lastValidName = loadout[slot];
  const currentItem = items[lastValidName];
  const currentStyle = "crush";
  let currentAtk;
  let currentStrength;
  if (!currentStyle) {
    currentAtk = 0;
    currentStrength = 0;
  } else {
    currentAtk = currentItem.equipment["attack_" + currentStyle];
    currentStrength = currentItem.equipment.melee_strength;
  }

  const handleFocus = (event) => {
    event.target.select();
  }

  const handleChange = (event) => {
    // there are two possibilities: either someone is in the middle of typing an
    // item's name -- in which case the name will not be valid -- or someone has
    // finished typing/selected an item -- in which case the name will be valid.
    // we'll update the text box regardless, but we'll only update the loadout
    // if/once a valid name is given.
    if (event === "") { event = "None"; }
    setCurrentName(event);
    if (itemNames.includes(event)) {
      const newLoadout = { ...loadout };
      newLoadout[slot] = event;
      setLoadout(boxNum, newLoadout);
    }
  }

  return (
      <div className="loadout-row">
        <span className="loadout-name">{slot}</span>

        <TextField
          Component="input"
          type="text"
          matchAny={true}
          trigger=""
          regex="^[a-zA-Z0-9_\-' ]+$"
          spacer=""
          maxOptions={10}
          options={itemNames}
          value={currentName}
          onFocus={handleFocus}
          onChange={(event) => handleChange(event)}
          style={{width: "14em"}}
        />

        <span className="atk-bonus-field">{currentAtk}</span>

        <span className="str-bonus-field">{currentStrength}</span>
      </div>
  );
}

export default GearSlotEntry;