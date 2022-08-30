import { useState } from "react";

import GearSlotEntry from "./GearSlotEntry";
import GearStyleSelect from "./GearStyleSelect";
import LoadoutTotal from "./LoadoutTotal";
import LoadoutOptions from "./LoadoutOptions";
import SaveLoadout from "./SaveLoadout";

import { addLoadout } from "../../../../api/user";
import getDefaultLoadout from "../../utils/getDefaultLoadout";

// should be the same entries  as Object.keys(itemList), but ordered in a
// sensible way for the UI
const SLOT_NAMES = [
  "weapon",
  "ammo",
  "head",
  "neck",
  "cape",
  "body",
  "hands",
  "shield",
  "ring",
  "legs",
  "feet",
];

const GearLoadout = (props) => {
  const { itemList, loadout, setLoadout, boxNum } = props;
  const { user, setUser } = props;
  const { transferLoadout } = props;

  const [attackList, setAttackList] = useState(SLOT_NAMES.reduce((atk, slot) => {
    atk[slot] = 0;
    return atk;
  }, {}));
  const [strengthList, setStrengthList] = useState(SLOT_NAMES.reduce((str, slot) => {
    str[slot] = 0;
    return str;
  }, {}));
  const [resetSelection, setResetSelection] = useState(false);
  const [disableShield, setDisableShield] = useState(false);

  const handleClearLoadout = (event) => {
    event.preventDefault();
    setLoadout(getDefaultLoadout(itemList));
  }

  const handleSaveLoadout = async (event) => {
    event.preventDefault();

    const loadoutName = prompt("Enter a name for your loadout.");
    if (!loadoutName) { return; }
    
    const userLoadouts = user.loadouts;
    console.log(Object.keys(userLoadouts), loadoutName)
    if (Object.keys(userLoadouts).includes(loadoutName)) {
      const overwriteLoadout = window.confirm(`There is an existing loadout named "${loadoutName}". Overwrite?`);
      if (!overwriteLoadout) { return; }
    }

    const loadoutEntry = {loadoutName, loadout};
    addLoadout(user, loadoutEntry)
      .then(res => res.data.newLoadouts)
      .then(newLoadouts => {
        const newUser = { ...user };
        newUser.loadouts = newLoadouts;
        setUser(newUser);
      })
      .catch(() => alert("Server error while saving loadout."));
  }

  const loadoutEntries = SLOT_NAMES.map((slot, i) => {
    return (
      <GearSlotEntry
        key={`slot-${boxNum}-${i}`}
        slot={slot}
        slotItems={itemList[slot]}
        allItems={itemList}
        loadout={loadout}
        setLoadout={setLoadout}
        attackList={attackList}
        setAttackList={setAttackList}
        strengthList={strengthList}
        setStrengthList={setStrengthList}
        resetSelection={resetSelection}
        setResetSelection={setResetSelection}
        disableShield={disableShield}
        setDisableShield={setDisableShield}
      />
    );
  });

  // for UI purposes, it makes the most sense if the weapon style is directly
  // under the weapon, which unfortunately necessitates a tiny bit of special
  // casing here
  const gearStyleComponent = (
    <GearStyleSelect
      key={`style-${boxNum}`}
      boxNum={boxNum}
      itemList={itemList}
      loadout={loadout}
      setLoadout={setLoadout}
      attackList={attackList}
      setAttackList={setAttackList}
      strengthList={strengthList}
      setStrengthList={setStrengthList}
      resetSelection={resetSelection}
      setResetSelection={setResetSelection}
      disableShield={disableShield}
    />
  );
  loadoutEntries.splice(1, 0, gearStyleComponent);

  return (
    <div id="loadout-menu">
      <h2>Loadout {boxNum}</h2>
      <LoadoutOptions
        user={user}
        loadout={loadout}
        setLoadout={setLoadout}
        transferLoadout={transferLoadout}
        boxNum={boxNum}
      />

      <div className="loadout-row">
        <span className="loadout-name">Slot</span>
        <span className="loadout-name">Item</span>
        <span className="loadout-name">Attack</span>
        <span className="loadout-name">Strength</span>
      </div>

      <div className="loadout-entries-area">
        {loadoutEntries}
      </div>

      <LoadoutTotal
        attackList={attackList}
        strengthList={strengthList}
      />

      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <form onSubmit={handleClearLoadout}>
          <input type="submit" value="Clear" />
        </form>

        <SaveLoadout
          user={user}
          handleSubmit={handleSaveLoadout}
        />
      </div>
    </div>
  );
}

export default GearLoadout;