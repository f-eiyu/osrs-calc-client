

const GearSlotEntry = (props) => {
  const slot = props.slot;
  

  return (
    <div className="loadout-row">
      <label className="loadout-name">{slot}</label>
      <input className="eq-name" type="text" value={slot}/>
      <input className="atk-bonus-field" type="number" value="2"/>
      <input className="str-bonus-field" type="number" value="1"/>
    </div>
  )
}

export default GearSlotEntry;