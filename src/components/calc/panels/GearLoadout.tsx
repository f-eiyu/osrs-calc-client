import GearSlotEntry from "./GearSlotEntry";

const GearLoadout = (props: {boxNum: string}) => {
  const boxNum: string = props.boxNum;

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
        <GearSlotEntry slot="Weapon" />
        <GearSlotEntry slot="Ammo" />
        <GearSlotEntry slot="Head" />
        <GearSlotEntry slot="Cape" />
        <GearSlotEntry slot="Neck" />
        <GearSlotEntry slot="Body" />
        <GearSlotEntry slot="Legs" />
        <GearSlotEntry slot="Shield" />
        <GearSlotEntry slot="Hands" />
        <GearSlotEntry slot="Feet" />
        <GearSlotEntry slot="Ring" />
      </form>


    </div>
  )
}

export default GearLoadout;