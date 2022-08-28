import { useState } from 'react';

import TextField from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import recalculateAtk from '../utils/recalculateAtk';
import recalculateStr from '../utils/recalculateStr';

const GearSlotEntry = (props) => {
  const { slot, boxNum, slotItems, allItems, loadout, setLoadout } = props;
  const { attackList, setAttackList, strengthList, setStrengthList } = props;
  // eslint-disable-next-line
  const { resetSelection, setResetSelection } = props;
  const { disableShield, setDisableShield } = props;

  const [currentName, setCurrentName] = useState("None");

  const itemNames = Object.keys(slotItems);

  // correctly set the attack and strength for the selected weapon style
  const currentAtk = attackList[slot];
  const currentStrength = strengthList[slot];

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
      const currentItem = slotItems[event];

      // change loadout
      const newLoadout = { ...loadout };
      newLoadout[slot] = event;

      // switch style and recalculate all bonuses, if the item is a weapon
      if (slot === "weapon") {
        let style = currentItem.weapon.stances[0];
        let attackType = "crush";
        setResetSelection(true);

        if (style.experience.includes("ranged")) { attackType = "ranged"; }
        else if (style.experience.includes("magic")) { attackType = "magic"; }
        else if (style.attack_type) { attackType = style.attack_type; }
        newLoadout.style = attackType;

        // if the new weapon is two-handed, disable the shield slot
        let currentDisableShield;
        if (currentItem.equipment.slot === "2h") { currentDisableShield = true; }
        // otherwise, enable the shield slot
        else { currentDisableShield = false; }
        setDisableShield(currentDisableShield);
        setLoadout(boxNum, newLoadout);

        // generate and save new attack bonuses
        const newAtk = { ...attackList };
        for (const atkSlot of Object.keys(attackList)) {
          const atkItem = allItems[atkSlot][newLoadout[atkSlot]];
          newAtk[atkSlot] = recalculateAtk(atkItem, attackType, currentDisableShield);
        }
        setAttackList(newAtk);

        // generate and save new strength bonuses
        const newStr = { ...strengthList };
        for (const strSlot of Object.keys(strengthList)) {
          const strItem = allItems[strSlot][newLoadout[strSlot]];
          newStr[strSlot] = recalculateStr(strItem, attackType, currentDisableShield);
        }
        setStrengthList(newStr);
      }
      // if it's not a weapon, only update the slot's style bonuses
      else {
        setLoadout(boxNum, newLoadout);

        // change attack list state
        const newAtk = { ...attackList };
        newAtk[slot] = recalculateAtk(currentItem, newLoadout.style, disableShield);
        setAttackList(newAtk);
  
        // change strength list state
        const newStr = { ...strengthList };
        newStr[slot] = recalculateStr(currentItem, newLoadout.style, disableShield);
        setStrengthList(newStr);
      }
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
        disabled={slot === "shield" && disableShield}
      />

      <span className="atk-bonus-field">{currentAtk}</span>

      <span className="str-bonus-field">{currentStrength}</span>
    </div>
  );
}

export default GearSlotEntry;