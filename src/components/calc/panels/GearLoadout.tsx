import GearSlotEntry from "./GearSlotEntry";

const SLOT_NAMES: Array<string> = [
  "Weapon",
  "Ammo",
  "Head",
  "Cape",
  "Neck",
  "Body",
  "Legs",
  "Shield",
  "Hands",
  "Feet",
  "Ring"
];

const GearLoadout = (props: {boxNum: string}) => {
  const boxNum: string = props.boxNum;

  const gearFormEntries = SLOT_NAMES.map((slot, i) => {
    return <GearSlotEntry key={`slot-${i}`} slot={slot} />
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