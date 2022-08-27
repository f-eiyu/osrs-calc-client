import GearSlotEntry from "./GearSlotEntry";

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
  const { itemList, boxNum } = props;

  const gearFormEntries = SLOT_NAMES.map((slot, i) => {
    return (
      <GearSlotEntry
        key={`slot-${boxNum}-${i}`}
        slot={slot}
        items={itemList[slot]}
      />
    );
  });

  return (
    <div id="loadout-menu">
      <h2>Loadout {boxNum}</h2>
      <div className="loadout-row">
        <span className="loadout-name">Slot</span>
        <span className="loadout-name">Item</span>
        <span className="loadout-name">Attack</span>
        <span className="loadout-name">Strength</span>
      </div>

      <form className="loadout-form">
        {gearFormEntries}
      </form>


    </div>
  )
}

export default GearLoadout;