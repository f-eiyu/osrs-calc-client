import GearSlotEntry from "./GearSlotEntry";
import GearStyleSelect from "./GearStyleSelect";
import LoadoutTotal from "./LoadoutTotal";

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

  const loadoutEntries = SLOT_NAMES.map((slot, i) => {
    return (
      <GearSlotEntry
        key={`slot-${boxNum}-${i}`}
        boxNum={boxNum}
        slot={slot}
        items={itemList[slot]}
        loadout={loadout}
        setLoadout={setLoadout}
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
      items={itemList.weapon}
      loadout={loadout}
    />
  );
  loadoutEntries.splice(1, 0, gearStyleComponent);

  return (
    <div id="loadout-menu">
      <h2>Loadout {boxNum}</h2>
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
        itemList={itemList}
        loadout={loadout}
      />
    </div>
  );
}

export default GearLoadout;